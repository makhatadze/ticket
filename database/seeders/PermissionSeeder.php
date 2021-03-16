<?php
/**
 *  database/seeders/PermissionSeeder.php
 *
 * Date-Time: 16.03.21
 * Time: 16:41
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $webmaster = User::where('username','webmaster')->first();
        if (!$webmaster) {
            return;
        }
        DB::table('permissions')->delete();
        DB::table('roles')->delete();

        $permissions = array(
            array('name' => 'Read Role', 'slug' => 'read_role'),
            array('name' => 'Create Role', 'slug' => 'create_role'),
            array('name' => 'Edit Role', 'slug' => 'edit_role'),
            array('name' => 'Read User', 'slug' => 'read_user'),
            array('name' => 'Create User', 'slug' => 'create_user'),
            array('name' => 'Update User', 'slug' => 'update_user'),
            array('name' => 'Delete User', 'slug' => 'delete_user'),
            array('name' => 'Read Department', 'slug' => 'read_department'),
            array('name' => 'Create Department', 'slug' => 'create_department'),
            array('name' => 'Update Department', 'slug' => 'update_department'),
            array('name' => 'Delete Department', 'slug' => 'delete_department'),
            array('name' => 'Read Issue', 'slug' => 'read_issue'),
            array('name' => 'Create Issue', 'slug' => 'create_issue'),
            array('name' => 'Update Issue', 'slug' => 'update_issue'),
            array('name' => 'Delete Issue', 'slug' => 'delete_issue'),
            array('name' => 'Read Ticket', 'slug' => 'read_ticket'),
            array('name' => 'Confirm Ticket', 'slug' => 'confirm_ticket'),
            array('name' => 'Read Log', 'slug' => 'read_log')
        );

        DB::table('permissions')->insert($permissions);

        DB::table('roles')->insert([
            'name' =>'Admin',
            'slug' => 'admin'
        ]);

        $role = Role::where('slug','admin')->first();

        $permissions = Permission::all();

        DB::table('users_roles')->insert([
            'user_id' => $webmaster->id,
            'role_id' => $role->id
        ]);

        foreach ($permissions as $key => $item) {
            DB::table('roles_permissions')->insert([
                'role_id' => $role->id,
                'permission_id' => $item->id
            ]);

            DB::table('users_permissions')->insert([
                'user_id' => $webmaster->id,
                'permission_id' => $item->id
            ]);


        }

    }
}
