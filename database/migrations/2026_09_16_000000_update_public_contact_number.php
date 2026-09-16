<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('site_settings') || ! Schema::hasColumn('site_settings', 'whatsapp')) {
            return;
        }

        DB::table('site_settings')->update([
            'whatsapp' => '+255 622 022 488',
            'updated_at' => now(),
        ]);
    }

    public function down(): void
    {
        // Keep the current business contact number when rolling back code.
    }
};
