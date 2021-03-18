<?php
/**
 *  database/migrations/2021_03_18_064050_create_departments_users_table.php
 *
 * Date-Time: 18.03.21
 * Time: 10:46
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDepartmentsUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('departments_users', function (Blueprint $table) {
            $table->bigInteger('department_id')->unsigned()->index();
            $table->bigInteger('user_id')->unsigned()->index();
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Head, Member
            $table->integer('type');

            $table->primary(['department_id','user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('departments_users');
    }
}
