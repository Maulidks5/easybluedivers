<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnforceAdminIdleTimeout
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->is('admin') && ! $request->is('admin/*')) {
            return $next($request);
        }

        if (! Auth::check()) {
            return $next($request);
        }

        $timeoutMinutes = max(1, (int) env('ADMIN_IDLE_TIMEOUT', 30));
        $now = now()->timestamp;
        $lastActivity = (int) $request->session()->get('admin_last_activity', $now);

        if ($lastActivity < now()->subMinutes($timeoutMinutes)->timestamp) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect('/admin/login')->with('error', 'Your admin session expired after inactivity. Please sign in again.');
        }

        $request->session()->put('admin_last_activity', $now);

        return $next($request);
    }
}
