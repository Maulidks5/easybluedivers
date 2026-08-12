<?php

namespace App\Support;

use App\Models\Booking;
use App\Models\ExperienceSlot;

class SlotAvailability
{
    public static function remaining(ExperienceSlot $slot, ?int $excludeBookingId = null): ?int
    {
        if ($slot->capacity === null) {
            return $slot->spaces_available;
        }

        $query = Booking::where('experience_slot_id', $slot->id)->where('status', 'confirmed');
        if ($excludeBookingId !== null) {
            $query->whereKeyNot($excludeBookingId);
        }

        return max(0, $slot->capacity - (int) $query->sum('guests'));
    }

    public static function sync(ExperienceSlot $slot): void
    {
        if ($slot->capacity !== null) {
            $slot->update(['spaces_available' => self::remaining($slot)]);
        }
    }
}
