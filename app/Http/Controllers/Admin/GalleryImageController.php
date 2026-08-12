<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryImageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery', [
            'items' => GalleryImage::orderBy('sort_order')->latest()->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'images' => ['required', 'array', 'min:1', 'max:12'],
            'images.*' => ['image', 'max:5120'],
            'alt_text' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
        ]);

        foreach ($request->file('images') as $image) {
            GalleryImage::create([
                'image_path' => $image->store('gallery', 'public'),
                'alt_text' => $data['alt_text'] ?? null,
                'category' => $data['category'] ?? null,
                'sort_order' => $data['sort_order'] ?? 0,
                'is_featured' => $data['is_featured'] ?? false,
                'is_active' => $data['is_active'] ?? true,
            ]);
        }

        return back();
    }

    public function update(Request $request, GalleryImage $gallery)
    {
        $data = $request->validate([
            'alt_text' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'image' => ['nullable', 'image', 'max:5120'],
        ]);

        if ($request->hasFile('image')) {
            $newImagePath = $request->file('image')->store('gallery', 'public');
            Storage::disk('public')->delete($gallery->image_path);
            $data['image_path'] = $newImagePath;
        }

        $gallery->update($data);
        return back();
    }

    public function destroy(GalleryImage $gallery)
    {
        Storage::disk('public')->delete($gallery->image_path);
        $gallery->delete();

        return back();
    }
}
