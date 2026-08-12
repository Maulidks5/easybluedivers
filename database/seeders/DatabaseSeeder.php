<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\DiveExperience;
use App\Models\DiveSite;
use App\Models\ExperienceCategory;
use App\Models\ExperienceSlot;
use App\Models\Faq;
use App\Models\GalleryImage;
use App\Models\PricePackage;
use App\Models\Review;
use App\Models\SiteSetting;
use App\Models\SiteContentBlock;
use App\Models\TeamMember;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(['email' => 'maulid4salum@gmail.com'], ['name' => 'Easy Blue Admin', 'role' => 'admin', 'password' => Hash::make('Admin001')]);
        SiteSetting::updateOrCreate(['id' => 1], ['whatsapp' => '+255 777 422 488', 'email' => 'info@easybluedivers.com', 'location' => 'Jambiani, Zanzibar, Tanzania', 'payment_currency' => 'TZS']);
        foreach ([
            ['key' => 'home_hero', 'title' => 'Your Zanzibar Dive Starts Here', 'subtitle' => 'Easy, well-planned scuba experiences for first-time divers, certified divers and private groups.', 'body' => 'Clear guidance • Small-group attention • Easy WhatsApp planning', 'data' => ['image_path' => 'gallery/easy-blue/divers-at-sea.jpeg']],
            ['key' => 'about_story', 'title' => 'Diving Made Personal in Zanzibar', 'subtitle' => 'Easy Blue Divers brings together local reef knowledge, calm guidance and a warm island welcome.', 'body' => 'We believe the best dive experience begins before you enter the water. That is why we take time to understand your plans, explain each step clearly and recommend an experience that matches your confidence and time in Zanzibar. From a first underwater breath to a relaxed guided reef dive, our focus is simple: help you feel prepared, supported and excited for the day ahead.', 'data' => ['image_path' => 'gallery/easy-blue/easy-blue-zanzibar.jpeg']],
            ['key' => 'contact_intro', 'title' => 'Let’s Plan a Dive That Fits Your Trip', 'subtitle' => 'Tell us your dates, number of guests and experience level. We will reply with a clear next step.', 'body' => 'For the fastest reply, include where you are staying, whether you are certified, and whether you would like a private or shared experience.', 'data' => ['image_path' => 'gallery/easy-blue/easy-blue-centre.jpeg']],
            ['key' => 'safety_hero', 'title' => 'A Good Dive Day Starts With a Good Plan', 'subtitle' => 'Clear briefings, sensible decisions and the right experience for the conditions and your comfort level.', 'body' => 'We confirm the plan with you, explain what to expect and keep safety at the centre of every decision.', 'data' => ['image_path' => 'gallery/easy-blue/pre-dive-briefing.jpeg']],
            ['key' => 'dive_services_hero', 'title' => 'Dive Zanzibar at Your Own Pace', 'subtitle' => 'Try scuba for the first time, join a guided reef dive or create a plan around your holiday.', 'body' => 'Share your dates, experience and interests. We will recommend a simple plan and confirm what works best for the day.', 'data' => ['image_path' => 'gallery/easy-blue/divers-on-boat.jpeg']],
            ['key' => 'booking_terms', 'title' => 'Booking Terms', 'subtitle' => 'Clear information before you reserve your Zanzibar dive.', 'body' => 'Bookings are confirmed only after Easy Blue Divers confirms availability and any agreed deposit has been received.\n\nDive plans may change because of weather, sea conditions, tides, operational requirements or diver suitability. We will communicate any material change as early as possible.\n\nGuests must provide accurate information about their diving experience, health and any relevant medical conditions. Participation remains subject to our safety briefing and professional assessment.'],
            ['key' => 'privacy_policy', 'title' => 'Privacy Policy', 'subtitle' => 'How Easy Blue Divers uses the information you share with us.', 'body' => 'We collect the contact and booking details you provide so we can reply to your enquiry, plan your diving experience and provide customer support.\n\nWe do not sell your personal information. Your details are used only by Easy Blue Divers and trusted service providers needed to operate your booking.\n\nFor any privacy question, please contact Easy Blue Divers through the contact page or WhatsApp.'],
        ] as $block) { SiteContentBlock::updateOrCreate(['key' => $block['key']], $block); }

        $beginner = ExperienceCategory::updateOrCreate(['slug' => 'beginners'], ['name' => 'Beginners', 'description' => 'First-time scuba experiences', 'sort_order' => 1, 'is_active' => true]);
        $certified = ExperienceCategory::updateOrCreate(['slug' => 'certified-divers'], ['name' => 'Certified Divers', 'description' => 'Guided reef dives and confidence refreshers', 'sort_order' => 2, 'is_active' => true]);
        $tailored = ExperienceCategory::updateOrCreate(['slug' => 'private-and-groups'], ['name' => 'Private & Groups', 'description' => 'Flexible plans for couples, families and groups', 'sort_order' => 3, 'is_active' => true]);
        $experiences = [
            ['title' => 'Discover Scuba Diving', 'slug' => 'discover-scuba-diving', 'experience_category_id' => $beginner->id, 'description' => 'A relaxed first introduction to breathing underwater, with unhurried guidance from start to finish.', 'duration' => 'Half day', 'level' => 'First-time diver', 'price_from' => 'Ask for today’s rate', 'image_path' => 'gallery/easy-blue/pool-training.jpeg', 'highlights' => ['Simple pre-dive explanation', 'Skills practice before the sea', 'Close professional supervision'], 'included_items' => ['Equipment for the experience', 'Professional supervision', 'Drinking water'], 'requirements' => ['Minimum age and medical suitability apply', 'Comfort in the water is helpful'], 'is_active' => true, 'sort_order' => 1],
            ['title' => 'Guided Reef Dives', 'slug' => 'guided-fun-dives', 'experience_category_id' => $certified->id, 'description' => 'Explore Zanzibar’s underwater landscape with a professional guide who plans around conditions and your experience.', 'duration' => 'Half or full day', 'level' => 'Certified diver', 'price_from' => 'Ask for today’s rate', 'image_path' => 'gallery/easy-blue/underwater-guests.jpeg', 'highlights' => ['Small, relaxed groups', 'Local dive-site planning', 'Clear briefing before every dive'], 'included_items' => ['Professional guide', 'Tanks and weights', 'Drinking water'], 'requirements' => ['Valid dive certification', 'Recent experience details requested'], 'is_active' => true, 'sort_order' => 2],
            ['title' => 'Dive Refresher', 'slug' => 'dive-refresher', 'experience_category_id' => $certified->id, 'description' => 'Get comfortable with your equipment and key skills again before returning to a guided dive.', 'duration' => 'Plan on request', 'level' => 'Certified diver', 'price_from' => 'Request a quote', 'image_path' => 'gallery/easy-blue/pre-dive-briefing.jpeg', 'highlights' => ['Calm skills review', 'Plan suited to your recent diving', 'Guidance before the ocean'], 'included_items' => ['Professional guidance', 'Equipment discussion', 'Personal plan'], 'requirements' => ['Valid dive certification', 'Tell us when you last dived'], 'is_active' => true, 'sort_order' => 3],
            ['title' => 'Private & Group Diving', 'slug' => 'private-group-diving', 'experience_category_id' => $tailored->id, 'description' => 'A flexible dive plan for couples, families, friends or groups who would like more personal attention.', 'duration' => 'Tailored to your trip', 'level' => 'All levels', 'price_from' => 'Request a tailored quote', 'image_path' => 'gallery/easy-blue/easy-blue-team.jpeg', 'highlights' => ['Plan around your travel dates', 'Private or small-group options', 'One clear point of contact'], 'included_items' => ['Planning consultation', 'Experience recommendation', 'Availability confirmation'], 'requirements' => ['Share group size and experience levels'], 'is_active' => true, 'sort_order' => 4],
        ];
        foreach ($experiences as $data) { DiveExperience::updateOrCreate(['slug' => $data['slug']], $data); }

        DiveSite::updateOrCreate(['name' => 'Jambiani Dive Area'], [
            'area' => 'Jambiani, Zanzibar',
            'description' => 'Our local dive planning begins around Jambiani. The exact site, route and timing are selected according to conditions, tides and the experience of the divers joining that day.',
            'level' => 'Chosen around your experience and the day’s conditions',
            'depth_range' => 'Confirmed with your final dive plan',
            'travel_time' => 'Confirmed when availability is checked',
            'highlights' => 'Local planning · Clear pre-dive briefing · Flexible day-by-day decisions',
            'image_path' => 'gallery/easy-blue/underwater-diver.jpeg',
            'sort_order' => 1,
            'is_active' => true,
        ]);
        foreach ([
            ['name' => 'SAMPLE — Mnemba Day Trip', 'area' => 'Northern Zanzibar', 'description' => 'Sample content: a full-day special-trip option for certified divers. Replace this description, travel details, suitability and pricing with Easy Blue’s confirmed operating plan before publishing.', 'level' => 'Sample — certified divers', 'depth_range' => 'Sample — confirm with your team', 'travel_time' => 'Sample — add actual transfer and boat timing', 'highlights' => 'Sample: different reef scenery · full-day planning · subject to conditions', 'image_path' => 'gallery/easy-blue/colourful-reef.jpeg', 'sort_order' => 20, 'is_active' => false],
            ['name' => 'SAMPLE — Kizimkazi Special Dive', 'area' => 'Southern Zanzibar', 'description' => 'Sample content: use this format when adding a special trip. Explain who it is suitable for, the operational plan and why conditions may affect the final choice.', 'level' => 'Sample — experienced divers', 'depth_range' => 'Sample — add verified range', 'travel_time' => 'Sample — add actual travel time', 'highlights' => 'Sample: special-trip planning · conditions checked first · personal recommendation', 'image_path' => 'gallery/easy-blue/dolphins.jpeg', 'sort_order' => 21, 'is_active' => false],
        ] as $data) { DiveSite::updateOrCreate(['name' => $data['name']], $data); }

        foreach ([
            ['name' => 'SAMPLE — Amina Hassan', 'role' => 'Dive Instructor', 'bio' => 'Sample profile: Amina welcomes first-time divers and explains each step with a calm, patient approach. Replace this text with the real team member’s story.', 'languages' => 'Sample: English · Swahili', 'qualifications' => 'Sample: add verified certification and instructor number', 'image_path' => 'gallery/easy-blue/easy-blue-team.jpeg', 'sort_order' => 20, 'is_active' => false],
            ['name' => 'SAMPLE — Juma Said', 'role' => 'Divemaster / Local Guide', 'bio' => 'Sample profile: Juma helps certified guests plan a relaxed dive day around their experience and the conditions. Replace with genuine details before publishing.', 'languages' => 'Sample: English · Swahili', 'qualifications' => 'Sample: add verified qualification only', 'image_path' => 'gallery/easy-blue/pre-dive-briefing.jpeg', 'sort_order' => 21, 'is_active' => false],
        ] as $data) { TeamMember::updateOrCreate(['name' => $data['name']], $data); }

        $discover = DiveExperience::where('slug', 'discover-scuba-diving')->first();
        $fun = DiveExperience::where('slug', 'guided-fun-dives')->first();
        foreach ([[$discover, 1, '09:00'], [$fun, 1, '08:30'], [$fun, 3, '13:30']] as [$experience, $days, $time]) { if ($experience) ExperienceSlot::updateOrCreate(['dive_experience_id' => $experience->id, 'date' => now()->addDays($days)->toDateString(), 'start_time' => $time], ['capacity' => 6, 'spaces_available' => 6, 'status' => 'available']); }

        foreach ([
            ['title' => 'Entry-Level Diver Course', 'description' => 'Build a strong foundation in dive knowledge, equipment use and in-water skills with a structured plan for beginners.', 'level' => 'Beginner', 'duration' => 'Multi-day programme', 'price' => 'Request a quote', 'highlights' => ['Learn at a comfortable pace', 'Theory and practical sessions', 'Personal progress guidance'], 'sort_order' => 1],
            ['title' => 'Continue Your Diving Journey', 'description' => 'For certified divers ready to add experience, improve confidence or explore new aspects of recreational diving.', 'level' => 'Certified diver', 'duration' => 'Tailored programme', 'price' => 'Request a quote', 'highlights' => ['Based on your current experience', 'Practical skill development', 'Plan around your Zanzibar stay'], 'sort_order' => 2],
            ['title' => 'Dive Safety & First Aid Skills', 'description' => 'Ask us about practical safety and first-aid learning options that support your wider diving goals.', 'level' => 'Divers and non-divers', 'duration' => 'On request', 'price' => 'Request a quote', 'highlights' => ['Useful real-world skills', 'Clear, practical learning', 'Discuss the right option with our team'], 'sort_order' => 3],
        ] as $data) { Course::updateOrCreate(['title' => $data['title']], $data + ['is_active' => true]); }
        foreach ([
            ['title' => 'Discover Scuba Diving', 'description' => 'A carefully guided introduction for guests who have never dived before.', 'price_from' => 'Request current price', 'included_items' => ['Briefing and preparation', 'Equipment for the experience', 'Professional supervision'], 'sort_order' => 1, 'is_featured' => true],
            ['title' => 'Guided Reef Dives', 'description' => 'Guided diving for certified guests, planned around conditions and availability.', 'price_from' => 'Request current price', 'included_items' => ['Professional guide', 'Tanks and weights', 'Pre-dive briefing'], 'sort_order' => 2, 'is_featured' => false],
            ['title' => 'Multi-Day Dive Plan', 'description' => 'A flexible plan for guests who want more than one dive day during their stay.', 'price_from' => 'Personalised quote', 'included_items' => ['Trip planning', 'Recommended dive sequence', 'Clear availability confirmation'], 'sort_order' => 3, 'is_featured' => false],
            ['title' => 'Private & Group Plan', 'description' => 'A tailored option for couples, families, friends and organised groups.', 'price_from' => 'Personalised quote', 'included_items' => ['Personal planning call', 'Group-friendly options', 'One clear itinerary'], 'sort_order' => 4, 'is_featured' => false],
        ] as $data) { PricePackage::updateOrCreate(['title' => $data['title']], $data + ['is_active' => true]); }
        foreach ([
            ['title' => 'SAMPLE — Early Booking Double Dive', 'description' => 'Sample package format for guests who book in advance. Replace the eligibility period, price, included items and cancellation terms with Easy Blue’s actual policy.', 'price_from' => 'SAMPLE — USD 110', 'included_items' => ['Sample: professional guide', 'Sample: tanks and weights', 'Sample: confirm equipment and pickup policy'], 'sort_order' => 90, 'is_featured' => false, 'is_active' => false],
            ['title' => 'SAMPLE — Multi-Day Dive Plan', 'description' => 'Sample package format for repeat dive days. Replace the price progression and all inclusions with your actual commercial terms.', 'price_from' => 'SAMPLE — personalised multi-day rate', 'included_items' => ['Sample: plan by dive day', 'Sample: confirm site selection', 'Sample: confirm marine-fee treatment'], 'sort_order' => 91, 'is_featured' => false, 'is_active' => false],
        ] as $data) { PricePackage::updateOrCreate(['title' => $data['title']], $data); }
        foreach ([
            ['image_path' => 'gallery/easy-blue/divers-at-sea.jpeg', 'alt_text' => 'Easy Blue Divers guests enjoying clear Zanzibar water', 'category' => 'Dive moments', 'sort_order' => 1, 'is_featured' => true],
            ['image_path' => 'gallery/easy-blue/pool-training.jpeg', 'alt_text' => 'Easy Blue Divers pool training session in Zanzibar', 'category' => 'Training', 'sort_order' => 2, 'is_featured' => true],
            ['image_path' => 'gallery/easy-blue/underwater-guests.jpeg', 'alt_text' => 'Guests enjoying a supervised underwater dive', 'category' => 'Dive moments', 'sort_order' => 3, 'is_featured' => true],
            ['image_path' => 'gallery/easy-blue/easy-blue-zanzibar.jpeg', 'alt_text' => 'Easy Blue Divers Zanzibar dive centre', 'category' => 'Our centre', 'sort_order' => 4, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/easy-blue-team.jpeg', 'alt_text' => 'Easy Blue Divers team and guests outside the dive centre', 'category' => 'Our centre', 'sort_order' => 5, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/dive-centre-interior.jpeg', 'alt_text' => 'Easy Blue Divers welcoming dive centre interior', 'category' => 'Our centre', 'sort_order' => 6, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/equipment-bcds.jpeg', 'alt_text' => 'Diving BCD equipment prepared at Easy Blue Divers', 'category' => 'Equipment', 'sort_order' => 7, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/equipment-fins.jpeg', 'alt_text' => 'Diving fins, masks and wetsuits ready for guests', 'category' => 'Equipment', 'sort_order' => 8, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/instructor-pool.jpeg', 'alt_text' => 'Instructor guiding a guest during pool practice', 'category' => 'Training', 'sort_order' => 9, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/surface-training.jpeg', 'alt_text' => 'Divers practising skills at the sea surface', 'category' => 'Training', 'sort_order' => 10, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/pre-dive-briefing.jpeg', 'alt_text' => 'Clear pre-dive briefing on the Easy Blue boat', 'category' => 'Training', 'sort_order' => 11, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/divers-on-boat.jpeg', 'alt_text' => 'Divers preparing for a Zanzibar boat dive', 'category' => 'Dive moments', 'sort_order' => 12, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/guest-on-boat.jpeg', 'alt_text' => 'Guest enjoying the Easy Blue dive boat', 'category' => 'Dive moments', 'sort_order' => 13, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/dive-preparation.jpeg', 'alt_text' => 'Guests preparing at Easy Blue Divers', 'category' => 'Dive moments', 'sort_order' => 14, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/happy-divers.jpeg', 'alt_text' => 'Happy divers in the turquoise Zanzibar sea', 'category' => 'Dive moments', 'sort_order' => 15, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/guest-ready.jpeg', 'alt_text' => 'Guests and Easy Blue team ready to dive', 'category' => 'Dive moments', 'sort_order' => 16, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/guest-ready-boat.jpeg', 'alt_text' => 'Diver ready for an ocean experience', 'category' => 'Dive moments', 'sort_order' => 17, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/underwater-diver.jpeg', 'alt_text' => 'Easy Blue diver exploring underwater in Zanzibar', 'category' => 'Underwater life', 'sort_order' => 18, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/reef-fish.jpeg', 'alt_text' => 'School of reef fish in Zanzibar waters', 'category' => 'Underwater life', 'sort_order' => 19, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/clownfish.jpeg', 'alt_text' => 'Colourful clownfish among sea anemones', 'category' => 'Underwater life', 'sort_order' => 20, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/colourful-reef.jpeg', 'alt_text' => 'Colourful coral reef and marine life', 'category' => 'Underwater life', 'sort_order' => 21, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/pufferfish.jpeg', 'alt_text' => 'Pufferfish on a coral reef', 'category' => 'Underwater life', 'sort_order' => 22, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/lionfish.jpeg', 'alt_text' => 'Lionfish in Zanzibar reef waters', 'category' => 'Underwater life', 'sort_order' => 23, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/dolphins.jpeg', 'alt_text' => 'Dolphins seen during an ocean excursion', 'category' => 'Marine encounters', 'sort_order' => 24, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/reef-manta.jpeg', 'alt_text' => 'Colourful reef scene with marine life', 'category' => 'Underwater life', 'sort_order' => 25, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/easy-blue-centre.jpeg', 'alt_text' => 'Easy Blue Divers team at the Zanzibar dive centre', 'category' => 'Our centre', 'sort_order' => 26, 'is_featured' => false],
            ['image_path' => 'gallery/easy-blue/easy-blue-night.jpeg', 'alt_text' => 'Easy Blue Divers dive centre at night', 'category' => 'Our centre', 'sort_order' => 27, 'is_featured' => false],
        ] as $data) { GalleryImage::updateOrCreate(['image_path' => $data['image_path']], $data + ['is_active' => true]); }
        foreach ([['name' => 'SAMPLE — Sarah M.', 'country' => 'United Kingdom', 'rating' => 5, 'review' => 'Sample review text only. Replace this with a genuine, permissioned guest review before publishing.'], ['name' => 'SAMPLE — Jonas K.', 'country' => 'Germany', 'rating' => 5, 'review' => 'Sample review text only. Replace this with a genuine, permissioned guest review before publishing.']] as $data) { Review::updateOrCreate(['name' => $data['name']], $data + ['is_active' => false]); }
        foreach ([
            ['question' => 'Do I need diving experience?', 'answer' => 'No. Discover Scuba Diving is designed for first-time divers. Tell us how comfortable you are in the water and we will explain the right option.', 'sort_order' => 1],
            ['question' => 'What happens on a first scuba experience?', 'answer' => 'You begin with a clear briefing and equipment introduction, practise key skills, then continue only when you feel comfortable and the plan is appropriate.', 'sort_order' => 2],
            ['question' => 'Can certified divers join guided reef dives?', 'answer' => 'Yes. Share your certification and recent diving experience so we can recommend a suitable guided plan.', 'sort_order' => 3],
            ['question' => 'Is equipment included?', 'answer' => 'Inclusions depend on the experience you choose. Your confirmation will clearly state what is included and anything you should bring.', 'sort_order' => 4],
            ['question' => 'Can you arrange private or group diving?', 'answer' => 'Yes. Send your group size, dates and experience levels. We will suggest a practical private or group option.', 'sort_order' => 5],
            ['question' => 'How do sea conditions affect the plan?', 'answer' => 'Conditions, tides and diver suitability can affect timing or dive sites. We check the practical plan and communicate any important change clearly.', 'sort_order' => 6],
            ['question' => 'How do I check availability?', 'answer' => 'Use the booking form or WhatsApp with your preferred date and number of guests. We will confirm availability before you make any final commitment.', 'sort_order' => 7],
        ] as $data) { Faq::updateOrCreate(['question' => $data['question']], $data + ['is_active' => true]); }
    }
}
