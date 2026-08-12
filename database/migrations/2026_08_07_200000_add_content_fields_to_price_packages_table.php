<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('price_packages', function (Blueprint $table) {
            $table->json('included_items')->nullable()->after('price_from');
            $table->unsignedInteger('sort_order')->default(0)->after('included_items');
            $table->boolean('is_featured')->default(false)->after('sort_order');
        });
    }

    public function down(): void
    {
        Schema::table('price_packages', function (Blueprint $table) {
            $table->dropColumn(['included_items', 'sort_order', 'is_featured']);
        });
    }
};
