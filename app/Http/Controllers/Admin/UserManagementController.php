<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    public function index(Request $request)
    {
        $this->ensureAdmin($request);

        return Inertia::render('Admin/Users', [
            'items' => User::orderBy('name')->get(['id', 'name', 'email', 'role', 'created_at']),
        ]);
    }

    public function store(Request $request)
    {
        $this->ensureAdmin($request);

        User::create($this->validatedData($request, true));

        return back();
    }

    public function update(Request $request, User $user)
    {
        $this->ensureAdmin($request);
        $data = $this->validatedData($request, false, $user);

        if ($request->user()->is($user) && $data['role'] !== $user->role) {
            throw ValidationException::withMessages(['role' => 'You cannot change your own role. Ask another administrator.']);
        }

        if ($user->role === 'admin' && $data['role'] !== 'admin' && User::where('role', 'admin')->count() <= 1) {
            throw ValidationException::withMessages(['role' => 'Keep at least one administrator account.']);
        }

        $user->update($data);

        return back();
    }

    public function destroy(Request $request, User $user)
    {
        $this->ensureAdmin($request);

        if ($request->user()->is($user)) {
            throw ValidationException::withMessages(['user' => 'You cannot delete the account currently signed in.']);
        }

        if ($user->role === 'admin' && User::where('role', 'admin')->count() <= 1) {
            throw ValidationException::withMessages(['user' => 'Keep at least one administrator account.']);
        }

        $user->delete();

        return back();
    }

    private function ensureAdmin(Request $request): void
    {
        abort_unless($request->user()?->isAdmin(), 403);
    }

    private function validatedData(Request $request, bool $creating, ?User $user = null): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user)],
            'role' => ['required', Rule::in(['admin', 'staff'])],
            'password' => [$creating ? 'required' : 'nullable', 'string', 'min:8', 'confirmed'],
        ];
        $data = $request->validate($rules);

        if (blank($data['password'] ?? null)) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }

        return $data;
    }
}
