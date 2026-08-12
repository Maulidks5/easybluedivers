<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['full_name', 'whatsapp_number', 'guest_email', 'preferred_date', 'arrival_date', 'departure_date', 'accommodation', 'guest_request', 'safety_acknowledged', 'guests', 'experience', 'dive_experience_id', 'experience_slot_id', 'status', 'payment_status', 'deposit_amount', 'payment_reference', 'payment_notes', 'paid_at', 'admin_notes', 'source'];

    protected function casts(): array
    {
        return ['preferred_date' => 'date', 'arrival_date' => 'date', 'departure_date' => 'date', 'safety_acknowledged' => 'boolean', 'guests' => 'integer', 'deposit_amount' => 'decimal:2', 'paid_at' => 'datetime'];
    }

    public function experience(): BelongsTo
    {
        return $this->belongsTo(DiveExperience::class, 'dive_experience_id');
    }

    public function slot(): BelongsTo
    {
        return $this->belongsTo(ExperienceSlot::class, 'experience_slot_id');
    }
}
