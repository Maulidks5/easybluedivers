<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiveExperience;
use App\Models\ExperienceSlot;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ExperienceSlotController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ExperienceSlots', [
            'experiences' => DiveExperience::where('is_active', true)->orderBy('title')->get(['id', 'title']),
            'items' => ExperienceSlot::with('experience:id,title')
                ->withCount(['bookings as active_bookings_count' => fn ($query) => $query->whereNotIn('status', ['cancelled'])])
                ->withSum(['bookings as confirmed_guests_count' => fn ($query) => $query->where('status', 'confirmed')], 'guests')
                ->whereDate('date', '>=', today())
                ->orderBy('date')
                ->orderBy('start_time')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        ExperienceSlot::create($this->validatedData($request));

        return back();
    }

    public function update(Request $request, ExperienceSlot $experienceSlot)
    {
        $experienceSlot->update($this->validatedData($request, $experienceSlot));

        return back();
    }

    public function destroy(ExperienceSlot $experienceSlot)
    {
        $experienceSlot->delete();

        return back();
    }

    private function validatedData(Request $request, ?ExperienceSlot $ignore = null): array
    {
        $data = $request->validate([
            'dive_experience_id' => ['required', 'exists:dive_experiences,id'],
            'date' => ['required', 'date'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'capacity' => ['nullable', 'integer', 'min:1', 'max:999'],
            'spaces_available' => ['nullable', 'integer', 'min:0', 'max:999'],
            'status' => ['required', Rule::in(['available', 'limited', 'weather-dependent', 'unavailable'])],
            'guest_note' => ['nullable', 'string', 'max:1000'],
        ]);

        if (! empty($data['capacity']) && isset($data['spaces_available']) && $data['spaces_available'] > $data['capacity']) {
            throw ValidationException::withMessages(['spaces_available' => 'Spaces available cannot be greater than the slot capacity.']);
        }

        return $data;
    }
}
