<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Reviews', ['items' => Review::orderByDesc('is_featured')->latest()->get()]);
    }

    public function store(Request $request)
    {
        Review::create($request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:100'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'review' => ['required', 'string', 'max:2000'],
            'is_active' => ['boolean'],
            'is_featured' => ['boolean'],
        ]));

        return back();
    }

    public function update(Request $request, Review $review)
    {
        $review->update($request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:100'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'review' => ['required', 'string', 'max:2000'],
            'is_active' => ['required', 'boolean'],
            'is_featured' => ['boolean'],
        ]));

        return back();
    }

    public function destroy(Review $review)
    {
        $review->delete();

        return back();
    }
}
