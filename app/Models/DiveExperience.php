<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DiveExperience extends Model
{
    protected $fillable = ['title', 'slug', 'category', 'experience_category_id', 'description', 'duration', 'level', 'price_from', 'image_path', 'highlights', 'included_items', 'requirements', 'meeting_info', 'cancellation_note', 'seo_title', 'seo_description', 'is_active', 'sort_order'];
    protected function casts(): array { return ['is_active' => 'boolean', 'highlights' => 'array', 'included_items' => 'array', 'requirements' => 'array']; }

    public function experienceCategory(): BelongsTo
    {
        return $this->belongsTo(ExperienceCategory::class);
    }

    public function slots(): HasMany
    {
        return $this->hasMany(ExperienceSlot::class);
    }
}
