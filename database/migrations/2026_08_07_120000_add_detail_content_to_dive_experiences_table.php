<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('dive_experiences', function (Blueprint $table) {
            $table->string('image_path')->nullable()->after('price_from');
            $table->json('highlights')->nullable()->after('image_path');
            $table->json('included_items')->nullable()->after('highlights');
            $table->json('requirements')->nullable()->after('included_items');
            $table->text('meeting_info')->nullable()->after('requirements');
            $table->text('cancellation_note')->nullable()->after('meeting_info');
            $table->string('seo_title')->nullable()->after('cancellation_note');
            $table->text('seo_description')->nullable()->after('seo_title');
        });
    }

    public function down(): void
    {
        Schema::table('dive_experiences', function (Blueprint $table) {
            $table->dropColumn(['image_path', 'highlights', 'included_items', 'requirements', 'meeting_info', 'cancellation_note', 'seo_title', 'seo_description']);
        });
    }
};
