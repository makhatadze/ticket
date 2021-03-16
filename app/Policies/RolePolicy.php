<?php
/**
 *  app/Policies/RolePolicy.php
 *
 * Date-Time: 16.03.21
 * Time: 16:58
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Policies;

use App\Exceptions\PermissionException;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     *
     * @return mixed
     * @throws PermissionException
     */
    public function viewAny(User $user)
    {
        if($user->hasPermission('read_role')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User  $user
     * @param  \App\Models\Role  $role
     * @return mixed
     */
    public function view(User $user)
    {
        if($user->hasPermission('read_role')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        if($user->hasPermission('create_role')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User  $user
     * @param  \App\Models\Role  $role
     * @return mixed
     */
    public function update(User $user)
    {
        if($user->hasPermission('update_role')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User  $user
     * @param  \App\Models\Role  $role
     * @return mixed
     */
    public function delete(User $user)
    {
        if($user->hasPermission('delete_role')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param User  $user
     * @param  \App\Models\Role  $role
     * @return mixed
     */
    public function restore(User $user, Role $role)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param User  $user
     * @param  \App\Models\Role  $role
     * @return mixed
     */
    public function forceDelete(User $user, Role $role)
    {
        //
    }
}
