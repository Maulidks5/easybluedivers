<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TeamMemberController extends Controller
{
    public function index() { return Inertia::render('Admin/Team', ['items' => TeamMember::orderBy('sort_order')->orderBy('name')->get()]); }
    public function store(Request $request) { TeamMember::create($this->data($request)); return back(); }
    public function update(Request $request, TeamMember $team)
    {
        $data = $this->data($request);
        if (!empty($data['image_path']) && $team->image_path) Storage::disk('public')->delete($team->image_path);
        $team->update($data); return back();
    }
    public function destroy(TeamMember $team) { if ($team->image_path) Storage::disk('public')->delete($team->image_path); $team->delete(); return back(); }
    private function data(Request $request): array
    {
        $data = $request->validate(['name' => ['required','string','max:120'], 'role' => ['required','string','max:150'], 'bio' => ['nullable','string','max:2000'], 'languages' => ['nullable','string','max:255'], 'qualifications' => ['nullable','string','max:1000'], 'image' => ['nullable','image','max:5120'], 'sort_order' => ['nullable','integer','min:0','max:9999'], 'is_active' => ['boolean']]);
        if ($request->hasFile('image')) $data['image_path'] = $request->file('image')->store('team', 'public');
        unset($data['image']); return $data;
    }
}
