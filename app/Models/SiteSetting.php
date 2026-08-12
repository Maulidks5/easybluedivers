<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['whatsapp','email','location','google_maps_url','business_hours','instagram_url','facebook_url','tiktok_url','youtube_url','payment_currency','payment_instructions','payment_terms','google_review_url','analytics_measurement_id'];
}
