<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ExperienceSlot;
use App\Models\Course;
use App\Models\Faq;
use App\Models\PricePackage;
use App\Models\SiteSetting;
use App\Support\SlotAvailability;
use App\Support\BookingMailer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $filters = $request->validate([
            'status' => ['nullable', 'in:new,contacted,confirmed,cancelled,completed'],
            'date' => ['nullable', 'date'],
            'search' => ['nullable', 'string', 'max:100'],
        ]);

        // The booking already stores its public experience name in the `experience`
        // column. Do not eager-load the similarly named relation here: it would
        // replace that string with an object in Inertia's JSON response.
        $bookings = Booking::with(['slot:id,date,start_time,guest_note'])
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['date'] ?? null, fn ($query, $date) => $query->whereDate('preferred_date', $date))
            ->when($filters['search'] ?? null, function ($query, $search) {
                $term = '%' . trim($search) . '%';
                $query->where(fn ($matches) => $matches
                    ->where('full_name', 'like', $term)
                    ->orWhere('whatsapp_number', 'like', $term)
                    ->orWhere('experience', 'like', $term));
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Dashboard', [
            'bookings' => $bookings,
            'filters' => [
                'status' => $filters['status'] ?? '',
                'date' => $filters['date'] ?? '',
                'search' => $filters['search'] ?? '',
            ],
            'totalBookings' => Booking::count(),
            'bookingStatusCounts' => Booking::selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status'),
            'paymentStatusCounts' => Booking::selectRaw('payment_status, count(*) as total')->groupBy('payment_status')->pluck('total', 'payment_status'),
            'readiness' => [
                'settings' => SiteSetting::exists(),
                'experiences' => \App\Models\DiveExperience::where('is_active', true)->count(),
                'slots' => ExperienceSlot::whereDate('date', '>=', today())->where('status', '!=', 'unavailable')->count(),
                'courses' => Course::where('is_active', true)->count(),
                'prices' => PricePackage::where('is_active', true)->count(),
                'faqs' => Schema::hasTable('faqs') ? Faq::where('is_active', true)->count() : 0,
            ],
        ]);
    }

    public function calendar(Request $request)
    {
        $request->validate(['week_start' => ['nullable', 'date']]);
        $start = $request->filled('week_start')
            ? Carbon::parse((string) $request->string('week_start'))->startOfWeek()
            : now()->startOfWeek();
        $end = $start->copy()->endOfWeek();
        $slots = ExperienceSlot::with([
            'experience:id,title',
            'bookings' => fn ($query) => $query->latest()->select(['id', 'experience_slot_id', 'full_name', 'whatsapp_number', 'guests', 'status', 'admin_notes']),
        ])
            ->whereBetween('date', [$start->toDateString(), $end->toDateString()])
            ->orderBy('date')->orderBy('start_time')->get();

        $slotsByDate = $slots->groupBy(fn (ExperienceSlot $slot) => $slot->date->toDateString());

        return Inertia::render('Admin/BookingCalendar', [
            'weekStart' => $start->toDateString(),
            'weekEnd' => $end->toDateString(),
            'days' => collect(range(0, 6))->map(fn ($offset) => [
                'date' => $start->copy()->addDays($offset)->toDateString(),
                'slots' => $slotsByDate->get($start->copy()->addDays($offset)->toDateString(), collect())->values(),
            ])->values(),
        ]);
    }

    public function exportBookings(Request $request)
    {
        $filters = $request->validate([
            'status' => ['nullable', 'in:new,contacted,confirmed,cancelled,completed'],
            'date' => ['nullable', 'date'],
            'search' => ['nullable', 'string', 'max:100'],
        ]);
        $bookings = Booking::with(['slot:id,date,start_time'])
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status))
            ->when($filters['date'] ?? null, fn ($query, $date) => $query->whereDate('preferred_date', $date))
            ->when($filters['search'] ?? null, function ($query, $search) {
                $term = '%' . trim($search) . '%';
                $query->where(fn ($matches) => $matches->where('full_name', 'like', $term)->orWhere('whatsapp_number', 'like', $term)->orWhere('experience', 'like', $term));
            })->latest()->get();

        return response()->streamDownload(function () use ($bookings) {
            $output = fopen('php://output', 'w');
                fputcsv($output, ['Booking ID', 'Guest name', 'WhatsApp', 'Email', 'Experience', 'Preferred dive date', 'Arrival date', 'Guest departure date', 'Accommodation', 'Guest request', 'Departure slot date', 'Departure slot time', 'Guests', 'Booking status', 'Payment status', 'Deposit amount', 'Payment reference', 'Admin notes', 'Received at']);
            foreach ($bookings as $booking) {
                $safe = fn ($value) => is_string($value) && preg_match('/^[=+\-@]/', $value) ? "'{$value}" : $value;
                fputcsv($output, [
                    $booking->id, $safe($booking->full_name), $safe($booking->whatsapp_number), $safe($booking->guest_email), $safe($booking->experience),
                    $booking->preferred_date?->format('Y-m-d'), $booking->arrival_date?->format('Y-m-d'), $booking->departure_date?->format('Y-m-d'), $safe($booking->accommodation), $safe($booking->guest_request), $booking->slot?->date?->format('Y-m-d'), $booking->slot?->start_time,
                    $booking->guests, $booking->status, $booking->payment_status, $booking->deposit_amount, $safe($booking->payment_reference), $safe($booking->admin_notes), $booking->created_at?->format('Y-m-d H:i'),
                ]);
            }
            fclose($output);
        }, 'easy-blue-bookings-' . now()->format('Y-m-d') . '.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    public function updateBooking(Request $request, Booking $booking)
    {
        $data = $request->validate([
            'status' => ['required', 'in:new,contacted,confirmed,cancelled,completed'],
            'admin_notes' => ['nullable', 'string', 'max:2000'],
            'payment_status' => ['required', 'in:not_requested,pending,partially_paid,paid,refunded,not_required'],
            'deposit_amount' => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'payment_reference' => ['nullable', 'string', 'max:255'],
            'payment_notes' => ['nullable', 'string', 'max:2000'],
        ]);

        [$sendConfirmation, $sendDepositRequest] = DB::transaction(function () use ($booking, $data) {
            $booking = Booking::lockForUpdate()->findOrFail($booking->id);
            $slot = $booking->experience_slot_id ? ExperienceSlot::lockForUpdate()->find($booking->experience_slot_id) : null;

            if ($slot && $data['status'] === 'confirmed' && $booking->status !== 'confirmed') {
                $remaining = SlotAvailability::remaining($slot, $booking->id);
                if ($remaining !== null && $remaining < $booking->guests) {
                    throw ValidationException::withMessages(['status' => 'This slot no longer has enough capacity to confirm this booking.']);
                }
            }

            $booking->update($data);
            $statusChangedToConfirmed = $data['status'] === 'confirmed' && $booking->wasChanged('status');
            $paymentChangedToPending = $data['payment_status'] === 'pending' && $booking->wasChanged('payment_status');
            if (in_array($data['payment_status'], ['paid', 'partially_paid'], true) && ! $booking->paid_at) {
                $booking->update(['paid_at' => now()]);
            }
            if (! in_array($data['payment_status'], ['paid', 'partially_paid'], true) && $booking->paid_at) {
                $booking->update(['paid_at' => null]);
            }
            if ($slot) {
                SlotAvailability::sync($slot);
            }
            return [
                $statusChangedToConfirmed,
                $paymentChangedToPending,
            ];
        });

        if ($sendConfirmation) {
            BookingMailer::notifyGuestConfirmation($booking->fresh(['experience', 'slot']));
        }

        if ($sendDepositRequest) {
            BookingMailer::notifyGuestDepositRequest($booking->fresh(['experience', 'slot']), SiteSetting::first());
        }

        return back();
    }
}
