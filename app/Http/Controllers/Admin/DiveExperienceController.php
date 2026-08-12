<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiveExperience;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DiveExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() { return Inertia::render('Admin/Experiences', ['experiences' => DiveExperience::with('experienceCategory:id,name')->orderBy('sort_order')->orderBy('title')->get(), 'categories' => \App\Models\ExperienceCategory::where('is_active', true)->orderBy('sort_order')->get(['id', 'name'])]); }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) { $data=$this->validatedData($request); $data['slug']=Str::slug($data['title']).'-'.Str::lower(Str::random(5)); DiveExperience::create($data); return back(); }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DiveExperience $experience) { $data=$this->validatedData($request, true); if (! empty($data['image_path'])) { Storage::disk('public')->delete($experience->image_path); } $experience->update($data); return back(); }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DiveExperience $experience) { $experience->delete(); return back(); }

    private function validatedData(Request $request, bool $updating = false): array
    {
        $data = $request->validate(['title'=>[$updating ? 'sometimes' : 'required','max:255'],'description'=>[$updating ? 'sometimes' : 'required'],'experience_category_id'=>'nullable|exists:experience_categories,id','sort_order'=>'nullable|integer|min:0|max:9999','duration'=>'nullable|max:100','level'=>'nullable|max:100','price_from'=>'nullable|max:100','image'=>'nullable|image|max:5120','highlights'=>'nullable|string|max:2000','included_items'=>'nullable|string|max:2000','requirements'=>'nullable|string|max:2000','meeting_info'=>'nullable|string|max:2000','cancellation_note'=>'nullable|string|max:2000','seo_title'=>'nullable|max:255','seo_description'=>'nullable|max:500','is_active'=>'boolean']);
        foreach (['highlights', 'included_items', 'requirements'] as $field) { $data[$field] = collect(explode("\n", $data[$field] ?? ''))->map(fn ($value) => trim($value))->filter()->values()->all(); }
        if (! empty($data['image'])) { $data['image_path']=$request->file('image')->store('experiences','public'); }
        unset($data['image']);
        return $data;
    }
}
