<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PricePackage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricePackageController extends Controller
{
    public function index() { return Inertia::render('Admin/Prices', ['items' => PricePackage::orderBy('sort_order')->orderBy('title')->get()]); }

    public function store(Request $request)
    {
        PricePackage::create($this->validatedData($request));
        return back();
    }

    public function update(Request $request, PricePackage $price)
    {
        $price->update($this->validatedData($request));
        return back();
    }

    public function destroy(PricePackage $price) { $price->delete(); return back(); }

    private function validatedData(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:3000'],
            'price_from' => ['nullable', 'string', 'max:100'],
            'included_items' => ['nullable', 'string', 'max:2000'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
        ]);

        $data['included_items'] = collect(explode("\n", $data['included_items'] ?? ''))
            ->map(fn ($value) => trim($value))->filter()->values()->all();

        return $data;
    }
}
