<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    protected $fillable = ['name', 'role', 'bio', 'languages', 'qualifications', 'image_path', 'sort_order', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean']; }
}
