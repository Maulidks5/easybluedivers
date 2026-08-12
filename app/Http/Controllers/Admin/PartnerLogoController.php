<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PartnerLogo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PartnerLogoController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Partners', [
            'items' => PartnerLogo::orderBy('sort_order')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->data($request, true);
        $data['logo_path'] = $request->file('logo')->store('partner-logos', 'public');
        PartnerLogo::create($data);

        return back();
    }

    public function update(Request $request, PartnerLogo $partner)
    {
        $data = $this->data($request);

        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('partner-logos', 'public');
            Storage::disk('public')->delete($partner->logo_path);
        }

        $partner->update($data);

        return back();
    }

    public function destroy(PartnerLogo $partner)
    {
        Storage::disk('public')->delete($partner->logo_path);
        $partner->delete();

        return back();
    }

    private function data(Request $request, bool $logoRequired = false): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'logo' => [$logoRequired ? 'required' : 'nullable', 'image', 'max:2048'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:9999'],
            'is_active' => ['boolean'],
        ]);
    }
}
