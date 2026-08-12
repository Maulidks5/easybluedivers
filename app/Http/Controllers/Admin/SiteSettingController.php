<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting; use Illuminate\Http\Request; use Inertia\Inertia;

class SiteSettingController extends Controller
{
    public function edit(){return Inertia::render('Admin/Settings',['settings'=>SiteSetting::first()]);}
    public function update(Request $request){$s=SiteSetting::firstOrCreate();$s->update($request->validate(['whatsapp'=>'nullable|string|max:30','email'=>'nullable|email','location'=>'nullable|string|max:255','google_maps_url'=>'nullable|url','business_hours'=>'nullable|string|max:255','instagram_url'=>'nullable|url','facebook_url'=>'nullable|url','tiktok_url'=>'nullable|url','youtube_url'=>'nullable|url','payment_currency'=>'nullable|string|max:10','payment_instructions'=>'nullable|string|max:3000','payment_terms'=>'nullable|string|max:3000','google_review_url'=>'nullable|url','analytics_measurement_id'=>['nullable','regex:/^G-[A-Z0-9]+$/'] ]));return back();}
}
