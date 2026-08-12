<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactEnquiryController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DiveExperienceController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\PricePackageController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\GalleryImageController;
use App\Http\Controllers\Admin\SiteSettingController;
use App\Models\Review;
use App\Models\GalleryImage;
use App\Models\Course;
use App\Models\PricePackage;
use App\Models\DiveExperience;
use App\Models\ExperienceCategory;
use App\Models\ExperienceSlot;
use App\Models\Faq;
use App\Models\DiveSite;
use App\Models\TeamMember;
use App\Models\PartnerLogo;
use App\Support\DiveAvailability;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\Admin\DiveScheduleDayController;
use App\Http\Controllers\Admin\ExperienceCategoryController;
use App\Http\Controllers\Admin\ExperienceSlotController;
use App\Http\Controllers\Admin\SiteContentController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\DiveSiteController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\PartnerLogoController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Http\Controllers\Admin\ContactEnquiryController as AdminContactEnquiryController;
use App\Http\Controllers\Admin\HomeHeroMediaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home', [
    'cmsExperiences' => Schema::hasTable('dive_experiences') ? DiveExperience::where('is_active', true)->orderBy('sort_order')->take(4)->get(['id', 'title', 'slug', 'description', 'image_path']) : [],
    'cmsReviews' => Schema::hasColumn('reviews', 'is_active') ? Review::where('is_active', true)->when(Schema::hasColumn('reviews', 'is_featured'), fn ($query) => $query->orderByDesc('is_featured'))->latest()->take(6)->get() : [],
    'weeklySchedule' => DiveAvailability::between(now()->startOfWeek()->toDateString(), now()->endOfWeek()->toDateString()),
    'featuredDiveSites' => Schema::hasTable('dive_sites') ? DiveSite::where('is_active', true)->orderBy('sort_order')->take(3)->get(['id', 'name', 'area', 'level', 'depth_range', 'travel_time', 'image_path']) : [],
    'homeGalleryImages' => Schema::hasTable('gallery_images') ? GalleryImage::when(Schema::hasColumn('gallery_images', 'is_active'), fn ($query) => $query->where('is_active', true))->when(Schema::hasColumn('gallery_images', 'is_featured'), fn ($query) => $query->where('is_featured', true))->orderBy('sort_order')->take(3)->get(['id', 'image_path', 'alt_text']) : [],
    'partners' => Schema::hasTable('partner_logos') ? PartnerLogo::where('is_active', true)->orderBy('sort_order')->get(['id', 'name', 'logo_path', 'website_url']) : [],
]))->name('home');
Route::get('/diving', function (Request $request) {
    $selectedDate = preg_match('/^\d{4}-\d{2}-\d{2}$/', (string) $request->query('date')) ? $request->query('date') : null;
    $experiences = Schema::hasColumn('dive_experiences', 'is_active')
        ? DiveExperience::with('experienceCategory:id,name')->where('is_active', true)->orderBy('sort_order')->get()
        : collect();

    if (Schema::hasTable('experience_slots') && $experiences->isNotEmpty()) {
        $slots = ExperienceSlot::whereIn('dive_experience_id', $experiences->pluck('id'))
            ->where('status', '!=', 'unavailable')
            ->when($selectedDate, fn ($query) => $query->whereDate('date', $selectedDate), fn ($query) => $query->whereDate('date', '>=', today()))
            ->orderBy('date')->orderBy('start_time')->get()->groupBy('dive_experience_id');
        $experiences = $experiences
            ->when($selectedDate, fn ($items) => $items->filter(fn (DiveExperience $experience) => $slots->has($experience->id)))
            ->map(function (DiveExperience $experience) use ($slots) {
                $experience->setAttribute('next_slot', $slots->get($experience->id)?->first());
                return $experience;
            })->values();
    }

    return Inertia::render('DivingExperiences', [
        'cmsExperiences' => $experiences,
        'experienceCategories' => Schema::hasTable('experience_categories') ? ExperienceCategory::where('is_active', true)->orderBy('sort_order')->get(['id', 'name']) : [],
        'selectedDate' => $selectedDate,
    ]);
})->name('diving.index');
Route::get('/diving/discover-scuba-diving', fn () => Inertia::render('DivingExperience'))->name('diving.discover');
Route::get('/diving/experience/{experience:slug}', function (Request $request, DiveExperience $experience) {
    abort_unless($experience->is_active, 404);
    return Inertia::render('ExperienceBookingDetail', [
        'experience' => $experience,
        'slots' => Schema::hasTable('experience_slots') ? $experience->slots()->whereDate('date', '>=', today())->where('status', '!=', 'unavailable')->orderBy('date')->orderBy('start_time')->get() : [],
        'selectedDate' => $request->query('date'),
    ]);
})->name('diving.cms-experience');
Route::get('/diving/{experience}', function (string $experience) {
    abort_unless(in_array($experience, ['guided-fun-dives', 'private-diving'], true), 404);
    return Inertia::render('ExperienceDetail', ['experience' => $experience]);
})->name('diving.experience');
Route::get('/dive-services', fn () => Inertia::render('DiveServices'))->name('dive-services');
Route::get('/dive-sites', fn () => Inertia::render('DiveSites', ['sites' => Schema::hasTable('dive_sites') ? DiveSite::where('is_active', true)->orderBy('sort_order')->get() : []]))->name('dive-sites');
Route::get('/dive-planner', function (Request $request) {
    $week = $request->query('week') === 'next' ? 'next' : 'current';
    $start = $week === 'next' ? now()->addWeek()->startOfWeek() : now()->startOfWeek();
    $end = $start->copy()->endOfWeek();

    return Inertia::render('DivePlanner', [
        'week' => $week,
        'scheduleDays' => DiveAvailability::between($start->toDateString(), $end->toDateString()),
    ]);
})->name('dive-planner');
Route::get('/courses', fn () => Inertia::render('Courses', ['cmsCourses' => Schema::hasColumn('courses', 'is_active') ? Course::where('is_active', true)->when(Schema::hasColumn('courses', 'sort_order'), fn ($query) => $query->orderBy('sort_order'))->orderBy('title')->get() : [], 'cmsFaqs' => Schema::hasTable('faqs') ? Faq::where('is_active', true)->orderBy('sort_order')->get(['id', 'question', 'answer']) : []]))->name('courses.index');
Route::get('/courses/{course}', function (Course $course) {
    abort_unless($course->is_active, 404);
    return Inertia::render('CourseDetail', ['course' => $course]);
})->name('courses.show');
Route::get('/prices', fn () => Inertia::render('Prices', ['cmsPackages' => Schema::hasColumn('price_packages', 'is_active') ? PricePackage::where('is_active', true)->when(Schema::hasColumn('price_packages', 'sort_order'), fn ($query) => $query->orderBy('sort_order'))->orderBy('title')->get() : []]))->name('prices.index');
Route::get('/about', fn () => Inertia::render('About'))->name('about');
Route::get('/team', fn () => Inertia::render('Team', ['members' => Schema::hasTable('team_members') ? TeamMember::where('is_active', true)->orderBy('sort_order')->get() : []]))->name('team');
Route::get('/safety', fn () => Inertia::render('Safety'))->name('safety');
Route::get('/gallery', fn () => Inertia::render('Gallery', ['galleryImages' => Schema::hasTable('gallery_images') ? GalleryImage::when(Schema::hasColumn('gallery_images', 'is_active'), fn ($query) => $query->where('is_active', true))->orderBy('sort_order')->get() : []]))->name('gallery');
Route::get('/contact', fn () => Inertia::render('Contact'))->name('contact');
Route::get('/booking-terms', fn () => Inertia::render('Legal', ['type' => 'terms']))->name('booking-terms');
Route::get('/privacy', fn () => Inertia::render('Legal', ['type' => 'privacy']))->name('privacy');
Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');
Route::post('/enquiries', [ContactEnquiryController::class, 'store'])->middleware('throttle:10,1')->name('enquiries.store');
Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');
Route::middleware('guest')->group(function () { Route::get('/admin/login', [AuthController::class, 'create']); Route::post('/admin/login', [AuthController::class, 'store']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::get('/', DashboardController::class); Route::post('/logout', [AuthController::class, 'destroy']); });
Route::middleware('auth')->get('/admin/booking-calendar', [DashboardController::class, 'calendar']);
Route::middleware('auth')->get('/admin/bookings/export', [DashboardController::class, 'exportBookings']);
Route::middleware('auth')->put('/admin/bookings/{booking}', [DashboardController::class, 'updateBooking']);
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('experiences', DiveExperienceController::class)->only(['index', 'store', 'update', 'destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('courses', CourseController::class)->only(['index', 'store', 'update', 'destroy']); Route::resource('prices', PricePackageController::class)->only(['index', 'store', 'update', 'destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('reviews', ReviewController::class)->only(['index', 'store', 'update', 'destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('gallery', GalleryImageController::class)->only(['index', 'store', 'update', 'destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('dive-planner', DiveScheduleDayController::class)->only(['index', 'store', 'update', 'destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('experience-categories', ExperienceCategoryController::class)->only(['index', 'store', 'update', 'destroy']); Route::resource('experience-slots', ExperienceSlotController::class)->only(['index', 'store', 'update', 'destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::get('settings', [SiteSettingController::class, 'edit']); Route::put('settings', [SiteSettingController::class, 'update']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::get('content', [SiteContentController::class, 'index']); Route::put('content', [SiteContentController::class, 'update']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::get('home-hero', [HomeHeroMediaController::class, 'edit']); Route::put('home-hero', [HomeHeroMediaController::class, 'update']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('faqs', FaqController::class)->only(['index','store','update','destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('team', TeamMemberController::class)->only(['index','store','update','destroy']); Route::resource('dive-sites', DiveSiteController::class)->only(['index','store','update','destroy']); Route::resource('partners', PartnerLogoController::class)->only(['index','store','update','destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('users', UserManagementController::class)->only(['index','store','update','destroy']); });
Route::middleware('auth')->prefix('admin')->as('admin.')->group(function () { Route::resource('enquiries', AdminContactEnquiryController::class)->only(['index', 'update', 'destroy']); });
Route::fallback(fn (Request $request) => Inertia::render('NotFound')->toResponse($request)->setStatusCode(404));
