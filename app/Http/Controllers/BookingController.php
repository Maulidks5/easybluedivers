<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\ExperienceSlot;
use App\Support\BookingMailer;
use App\Support\SlotAvailability;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BookingController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'whatsapp_number' => ['required', 'string', 'max:30'],
            'guest_email' => ['nullable', 'email', 'max:255'],
            'preferred_date' => ['required', 'date', 'after_or_equal:today'],
            'arrival_date' => ['nullable', 'date'],
            'departure_date' => ['nullable', 'date', 'after_or_equal:arrival_date'],
            'accommodation' => ['nullable', 'string', 'max:255'],
            'guest_request' => ['nullable', 'string', 'max:2000'],
            'safety_acknowledged' => ['accepted'],
            'guests' => ['required', 'integer', 'min:1', 'max:20'],
            'experience' => ['required', 'string', 'max:100'],
            'dive_experience_id' => ['nullable', 'exists:dive_experiences,id'],
            'experience_slot_id' => ['nullable', 'exists:experience_slots,id'],
        ]);

        $booking = DB::transaction(function () use ($data) {
            if (! empty($data['experience_slot_id'])) {
                $slot = ExperienceSlot::lockForUpdate()->findOrFail($data['experience_slot_id']);

                if ($slot->status === 'unavailable' || $slot->date->toDateString() !== $data['preferred_date'] || (! empty($data['dive_experience_id']) && $slot->dive_experience_id !== (int) $data['dive_experience_id'])) {
                    throw ValidationException::withMessages(['preferred_date' => 'This departure slot is no longer available. Please choose another date.']);
                }

                $remaining = SlotAvailability::remaining($slot);
                if ($remaining !== null && $remaining < (int) $data['guests']) {
                    throw ValidationException::withMessages(['guests' => 'There are not enough spaces remaining for this departure. Please choose another slot or contact us.']);
                }
            }

            return Booking::create($data + ['source' => 'website', 'status' => 'new']);
        });

        BookingMailer::notifyAdmin($booking);
        BookingMailer::notifyGuestBookingReceived($booking);

        return back()->with('success', 'Thank you. We will contact you to confirm availability.');
    }
}
