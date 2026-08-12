<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiveScheduleDay extends Model
{
    protected $fillable = [
        'date',
        'status',
        'available_activities',
        'start_time',
        'spaces_available',
        'conditions_note',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date:Y-m-d',
            'available_activities' => 'array',
            'is_active' => 'boolean',
            'spaces_available' => 'integer',
        ];
    }
}
