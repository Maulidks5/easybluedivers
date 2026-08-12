<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index() { return Inertia::render('Admin/Courses', ['items' => Course::orderBy('sort_order')->orderBy('title')->get()]); }

    public function store(Request $request)
    {
        Course::create($this->validatedData($request));
        return back();
    }

    public function update(Request $request, Course $course)
    {
        $data = $this->validatedData($request);
        if (! empty($data['image_path']) && $course->image_path) {
            Storage::disk('public')->delete($course->image_path);
        }
        $course->update($data);
        return back();
    }

    public function destroy(Course $course)
    {
        if ($course->image_path) {
            Storage::disk('public')->delete($course->image_path);
        }
        $course->delete();
        return back();
    }

    private function validatedData(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:3000'],
            'level' => ['nullable', 'string', 'max:100'],
            'duration' => ['nullable', 'string', 'max:100'],
            'price' => ['nullable', 'string', 'max:100'],
            'image' => ['nullable', 'image', 'max:5120'],
            'highlights' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_active' => ['boolean'],
        ]);

        $data['highlights'] = collect(explode("\n", $data['highlights'] ?? ''))
            ->map(fn ($value) => trim($value))->filter()->values()->all();

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('courses', 'public');
        }

        unset($data['image']);
        return $data;
    }
}
