<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWithdrawalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('withdrawals', function (Blueprint $table) {
            $table->id();
            $table->string('withdrawalable_type')->nullable();
            $table->integer('withdrawalable_id')->nullable();
            $table->string('name');
            $table->json('payment')->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreignId('created_by')->unsigned()->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->unsigned()->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('deleted_by')->unsigned()->nullable()->constrained('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('withdrawals');
    }
}
