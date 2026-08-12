<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->date('arrival_date')->nullable()->after('preferred_date');
            $table->date('departure_date')->nullable()->after('arrival_date');
            $table->string('accommodation')->nullable()->after('departure_date');
            $table->text('guest_request')->nullable()->after('accommodation');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['arrival_date', 'departure_date', 'accommodation', 'guest_request']);
        });
    }
};
