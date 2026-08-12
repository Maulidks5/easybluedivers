<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiveExperience;
use App\Models\DiveScheduleDay;
use App\Models\DiveSite;
use App\Models\ExperienceCategory;
use App\Models\SiteContentBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SiteContentController extends Controller
{
    private const KEYS = ['home_hero', 'about_story', 'contact_intro', 'safety_hero', 'dive_services_hero', 'booking_terms', 'privacy_policy'];

    public function index()
    {
        return Inertia::render('Admin/SiteContent', [
            'blocks' => SiteContentBlock::whereIn('key', self::KEYS)->get(),
            'diving' => [
                'categories' => ExperienceCategory::orderBy('sort_order')->get(['id', 'name', 'description', 'is_active']),
                'experiences' => DiveExperience::with('experienceCategory:id,name')->orderBy('sort_order')->orderBy('title')->get(['id', 'title', 'duration', 'level', 'price_from', 'is_active', 'experience_category_id']),
                'sites' => DiveSite::orderBy('sort_order')->orderBy('name')->get(['id', 'name', 'area', 'level', 'is_active']),
                'upcomingDays' => DiveScheduleDay::where('date', '>=', today())->orderBy('date')->limit(6)->get(['id', 'date', 'status', 'spaces_available', 'is_active']),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'key' => ['required', Rule::in(self::KEYS)],
            'title' => ['nullable', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:1000'],
            'body' => ['nullable', 'string', 'max:4000'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        $block = SiteContentBlock::firstOrNew(['key' => $data['key']]);
        $blockData = $block->data ?? [];

        if ($request->hasFile('image')) {
            if (! empty($blockData['image_path'])) {
                Storage::disk('public')->delete($blockData['image_path']);
            }
            $blockData['image_path'] = $request->file('image')->store('site-content', 'public');
        }

        unset($data['image']);
        $block->fill($data + ['data' => $blockData]);
        $block->save();

        return back();
    }
}
