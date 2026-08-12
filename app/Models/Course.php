<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = ['title', 'description', 'level', 'duration', 'price', 'image_path', 'highlights', 'sort_order', 'is_active'];

    protected function casts(): array
    {
        return ['highlights' => 'array', 'is_active' => 'boolean'];
    }
}
