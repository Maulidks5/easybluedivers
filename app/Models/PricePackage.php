<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PricePackage extends Model
{
    protected $fillable = ['title', 'description', 'price_from', 'included_items', 'sort_order', 'is_featured', 'is_active'];

    protected function casts(): array
    {
        return ['included_items' => 'array', 'is_featured' => 'boolean', 'is_active' => 'boolean'];
    }
}
