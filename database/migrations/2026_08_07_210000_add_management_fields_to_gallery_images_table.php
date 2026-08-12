<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gallery_images', function (Blueprint $table) {
            $table->string('category')->nullable()->after('alt_text');
            $table->boolean('is_featured')->default(false)->after('sort_order');
            $table->boolean('is_active')->default(true)->after('is_featured');
        });
    }

    public function down(): void
    {
        Schema::table('gallery_images', function (Blueprint $table) {
            $table->dropColumn(['category', 'is_featured', 'is_active']);
        });
    }
};
