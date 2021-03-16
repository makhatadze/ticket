<?php
/**
 *  app/Traits/HasRolesAndPermissions.php
 *
 * Date-Time: 16.03.21
 * Time: 14:47
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Traits;

use App\Models\Permission;
use App\Models\Role;

trait HasRolesAndPermissions
{
    /**
     * @return boolean
     */
    public function isAdmin()
    {
        return $this->roles->contains('slug', 'admin');
    }

    /**
     *
     * @return mixed
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'users_roles');
    }

    /**
     *
     * @return mixed
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'users_permissions');
    }

    /**
     * Check if the user has Role
     *
     * @param String $permission
     *
     * @return boolean
     */
    public function hasPermission(string $permission): bool
    {
        return in_array($permission, array_column($this->permissions()->select('slug')->get()->toArray(), 'slug'));

    }
}