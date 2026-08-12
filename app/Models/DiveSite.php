<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiveSite extends Model
{
    protected $fillable = ['name', 'area', 'description', 'level', 'depth_range', 'travel_time', 'highlights', 'image_path', 'sort_order', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean']; }
}
