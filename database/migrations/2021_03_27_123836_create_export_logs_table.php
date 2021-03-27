<?php
/**
 *  database\migrations\2021_03_27_123836_create_export_logs_table.php
 *
 * Date-Time: 27.03.21
 * Time: 16:41
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExportLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('export_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('type');
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
        Schema::dropIfExists('export_logs');
    }
}
