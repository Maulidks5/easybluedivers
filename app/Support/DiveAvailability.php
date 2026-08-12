<?php

namespace App\Support;

use App\Models\ExperienceSlot;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;

class DiveAvailability
{
    public static function between(string $startDate, string $endDate): Collection
    {
        if (! Schema::hasTable('experience_slots')) {
            return collect();
        }

        return ExperienceSlot::with('experience:id,title,is_active')
            ->whereBetween('date', [$startDate, $endDate])
            ->whereHas('experience', fn ($query) => $query->where('is_active', true))
            ->orderBy('date')
            ->orderBy('start_time')
            ->get()
            ->groupBy(fn (ExperienceSlot $slot) => $slot->date->toDateString())
            ->map(function (Collection $slots, string $date) {
                $spaceValues = $slots->pluck('spaces_available')->filter(fn ($value) => $value !== null);
                $note = $slots->pluck('guest_note')->filter()->first();

                return [
                    'id' => (int) sprintf('%u', crc32($date)),
                    'date' => $date,
                    'status' => self::statusFor($slots),
                    'available_activities' => $slots->pluck('experience.title')->filter()->unique()->values(),
                    'start_time' => optional($slots->first())->start_time,
                    'spaces_available' => $spaceValues->isEmpty() ? null : $spaceValues->sum(),
                    'conditions_note' => $note,
                ];
            })
            ->values();
    }

    private static function statusFor(Collection $slots): string
    {
        foreach (['available', 'limited', 'weather-dependent'] as $status) {
            if ($slots->contains('status', $status)) {
                return $status;
            }
        }

        return 'unavailable';
    }
}
