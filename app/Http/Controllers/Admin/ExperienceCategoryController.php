<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExperienceCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ExperienceCategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/ExperienceCategories', [
            'items' => ExperienceCategory::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatedData($request);
        $data['slug'] = Str::slug($data['name']).'-'.Str::lower(Str::random(5));
        ExperienceCategory::create($data);

        return back();
    }

    public function update(Request $request, ExperienceCategory $experienceCategory)
    {
        $experienceCategory->update($this->validatedData($request));

        return back();
    }

    public function destroy(ExperienceCategory $experienceCategory)
    {
        $experienceCategory->delete();

        return back();
    }

    private function validatedData(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);
    }
}
