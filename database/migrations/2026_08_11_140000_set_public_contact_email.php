<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('site_settings')) {
            return;
        }

        DB::table('site_settings')
            ->where(function ($query) {
                $query->whereNull('email')
                    ->orWhere('email', '')
                    ->orWhere('email', 'maulid4salum@gmail.com');
            })
            ->update(['email' => 'info@easybluedivers.com']);
    }

    public function down(): void
    {
        // The public email is business content, so it is intentionally retained on rollback.
    }
};
