<?php
/**
 *  database/seeders/UserSeeder.php
 *
 * Date-Time: 15.03.21
 * Time: 11:51
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Webmaster Webmaster',
            'username' => 'webmaster',
            'password' => Hash::make('webmaster'),
        ]);
    }
}
