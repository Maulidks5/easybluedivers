<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiveScheduleDay;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DiveScheduleDayController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/DivePlanner', [
            'items' => DiveScheduleDay::whereDate('date', '>=', today()->startOfWeek())
                ->orderBy('date')
                ->get(),
        ]);
    }

    public function store(Request $request)
    {
        DiveScheduleDay::create($this->validatedData($request));

        return back();
    }

    public function update(Request $request, DiveScheduleDay $divePlanner)
    {
        $divePlanner->update($this->validatedData($request, $divePlanner));

        return back();
    }

    public function destroy(DiveScheduleDay $divePlanner)
    {
        $divePlanner->delete();

        return back();
    }

    private function validatedData(Request $request, ?DiveScheduleDay $ignore = null): array
    {
        $data = $request->validate([
            'date' => ['required', 'date', Rule::unique('dive_schedule_days', 'date')->ignore($ignore)],
            'status' => ['required', 'in:available,limited,weather-dependent,unavailable'],
            'activities' => ['nullable', 'string', 'max:500'],
            'start_time' => ['nullable', 'date_format:H:i'],
            'spaces_available' => ['nullable', 'integer', 'min:0', 'max:999'],
            'conditions_note' => ['nullable', 'string', 'max:1000'],
            'is_active' => ['boolean'],
        ]);

        $data['available_activities'] = collect(explode(',', $data['activities'] ?? ''))
            ->map(fn (string $activity) => trim($activity))
            ->filter()
            ->values()
            ->all();
        unset($data['activities']);

        return $data;
    }
}
