<?php
/**
 *  database/migrations/2021_03_19_064525_create_ip_restrictions_table.php
 *
 * Date-Time: 19.03.21
 * Time: 11:04
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIpRestrictionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ip_restrictions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->ipAddress('ip')->unique();
            $table->boolean('status')->default(true);
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
        Schema::dropIfExists('ip_restrictions');
    }
}
