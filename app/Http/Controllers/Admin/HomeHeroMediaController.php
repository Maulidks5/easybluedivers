<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteContentBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeHeroMediaController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/HomeHeroMedia', [
            'block' => SiteContentBlock::firstOrNew(['key' => 'home_hero']),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'media_type' => ['required', 'in:image,video'],
            'image' => ['nullable', 'image', 'max:5120'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/webm,video/quicktime', 'max:102400'],
        ]);

        $block = SiteContentBlock::firstOrNew(['key' => 'home_hero']);
        $blockData = $block->data ?? [];

        if ($data['media_type'] === 'image' && ! $request->hasFile('image') && empty($blockData['image_path'])) {
            return back()->withErrors(['image' => 'Upload a hero image before selecting image mode.']);
        }

        if ($data['media_type'] === 'video' && ! $request->hasFile('video') && empty($blockData['video_path'])) {
            return back()->withErrors(['video' => 'Upload a hero video before selecting video mode.']);
        }

        if ($request->hasFile('image')) {
            if (! empty($blockData['image_path'])) {
                Storage::disk('public')->delete($blockData['image_path']);
            }
            $blockData['image_path'] = $request->file('image')->store('site-content/home-hero', 'public');
        }

        if ($request->hasFile('video')) {
            if (! empty($blockData['video_path'])) {
                Storage::disk('public')->delete($blockData['video_path']);
            }
            $blockData['video_path'] = $request->file('video')->store('site-content/home-hero', 'public');
        }

        $blockData['media_type'] = $data['media_type'];
        $block->data = $blockData;
        $block->save();

        return back()->with('success', 'Home hero media updated.');
    }
}
