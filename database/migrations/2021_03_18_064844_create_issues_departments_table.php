<?php
/**
 *  database/migrations/2021_03_18_064844_create_issues_departments_table.php
 *
 * Date-Time: 18.03.21
 * Time: 11:00
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIssuesDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('issues_departments', function (Blueprint $table) {
            $table->bigInteger('issue_id')->unsigned()->index();
            $table->bigInteger('department_id')->unsigned()->index();
            $table->foreign('issue_id')->references('id')->on('issues')->onDelete('cascade');
            $table->foreign('department_id')->references('id')->on('departments')->onDelete('cascade');

            // (Write,Read), (Read)
            $table->integer('type');

            $table->primary(['issue_id','department_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('issues_departments');
    }
}
