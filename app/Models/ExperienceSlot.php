<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ExperienceSlot extends Model
{
    protected $fillable = ['dive_experience_id', 'date', 'start_time', 'capacity', 'spaces_available', 'status', 'guest_note'];

    protected function casts(): array
    {
        return ['date' => 'date:Y-m-d', 'capacity' => 'integer', 'spaces_available' => 'integer'];
    }

    public function experience(): BelongsTo
    {
        return $this->belongsTo(DiveExperience::class, 'dive_experience_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
