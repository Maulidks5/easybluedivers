<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiveSite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DiveSiteController extends Controller
{
    public function index() { return Inertia::render('Admin/DiveSites', ['items' => DiveSite::orderBy('sort_order')->orderBy('name')->get()]); }
    public function store(Request $request) { DiveSite::create($this->data($request)); return back(); }
    public function update(Request $request, DiveSite $diveSite)
    {
        $data = $this->data($request);
        if (!empty($data['image_path']) && $diveSite->image_path) Storage::disk('public')->delete($diveSite->image_path);
        $diveSite->update($data); return back();
    }
    public function destroy(DiveSite $diveSite) { if ($diveSite->image_path) Storage::disk('public')->delete($diveSite->image_path); $diveSite->delete(); return back(); }
    private function data(Request $request): array
    {
        $data = $request->validate(['name' => ['required','string','max:150'], 'area' => ['nullable','string','max:150'], 'description' => ['required','string','max:3000'], 'level' => ['nullable','string','max:100'], 'depth_range' => ['nullable','string','max:100'], 'travel_time' => ['nullable','string','max:100'], 'highlights' => ['nullable','string','max:1500'], 'image' => ['nullable','image','max:5120'], 'sort_order' => ['nullable','integer','min:0','max:9999'], 'is_active' => ['boolean']]);
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('dive-sites', 'public');
        unset($data['image']); return $data;
    }
}
