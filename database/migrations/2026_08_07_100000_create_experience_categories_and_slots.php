<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('experience_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::table('dive_experiences', function (Blueprint $table) {
            $table->foreignId('experience_category_id')->nullable()->after('category')->constrained('experience_categories')->nullOnDelete();
        });

        Schema::create('experience_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dive_experience_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->time('start_time')->nullable();
            $table->unsignedSmallInteger('capacity')->nullable();
            $table->unsignedSmallInteger('spaces_available')->nullable();
            $table->string('status', 30)->default('available');
            $table->text('guest_note')->nullable();
            $table->timestamps();
            $table->unique(['dive_experience_id', 'date', 'start_time']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignId('dive_experience_id')->nullable()->after('experience')->constrained()->nullOnDelete();
            $table->foreignId('experience_slot_id')->nullable()->after('dive_experience_id')->constrained()->nullOnDelete();
            $table->string('status', 30)->default('new')->after('experience_slot_id');
            $table->text('admin_notes')->nullable()->after('status');
            $table->string('source', 30)->default('website')->after('admin_notes');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropConstrainedForeignId('experience_slot_id');
            $table->dropConstrainedForeignId('dive_experience_id');
            $table->dropColumn(['status', 'admin_notes', 'source']);
        });
        Schema::dropIfExists('experience_slots');
        Schema::table('dive_experiences', function (Blueprint $table) {
            $table->dropConstrainedForeignId('experience_category_id');
        });
        Schema::dropIfExists('experience_categories');
    }
};
