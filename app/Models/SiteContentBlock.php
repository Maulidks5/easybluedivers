<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class SiteContentBlock extends Model { protected $fillable=['key','title','subtitle','body','data']; protected function casts(): array { return ['data'=>'array']; } }
