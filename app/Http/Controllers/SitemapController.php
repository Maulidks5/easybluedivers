<?php

namespace App\Http\Controllers;

use App\Models\DiveExperience;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Schema;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $paths = [
            '/', '/diving', '/diving/discover-scuba-diving', '/diving/guided-fun-dives',
            '/diving/private-diving', '/dive-planner', '/dive-services', '/dive-sites', '/courses', '/prices', '/gallery', '/about', '/team', '/contact', '/safety', '/booking-terms', '/privacy',
        ];
        $baseUrl = rtrim(config('app.url'), '/');
        $updated = now()->toAtomString();
        $urls = collect($paths)->map(fn (string $path) => [
            'loc' => $baseUrl.$path,
            'lastmod' => $updated,
        ]);
        if (Schema::hasTable('dive_experiences')) {
            $urls = $urls->concat(DiveExperience::where('is_active', true)->get(['slug', 'updated_at'])->map(fn (DiveExperience $experience) => [
                'loc' => $baseUrl.'/diving/experience/'.$experience->slug,
                'lastmod' => $experience->updated_at?->toAtomString() ?? $updated,
            ]));
        }

        return response()->view('sitemap', compact('urls'))->header('Content-Type', 'application/xml');
    }
}
