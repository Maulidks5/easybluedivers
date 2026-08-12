<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dive_schedule_days', function (Blueprint $table) {
            $table->id();
            $table->date('date')->unique();
            $table->string('status', 30)->default('available');
            $table->json('available_activities')->nullable();
            $table->time('start_time')->nullable();
            $table->unsignedSmallInteger('spaces_available')->nullable();
            $table->text('conditions_note')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dive_schedule_days');
    }
};
