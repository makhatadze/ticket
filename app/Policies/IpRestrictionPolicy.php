<?php
/**
 *  app/Policies/IpRestrictionPolicy.php
 *
 * Date-Time: 19.03.21
 * Time: 11:04
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Policies;

use App\Exceptions\PermissionException;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class IpRestrictionPolicy
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
    public function viewAny(User $user): bool
    {
        if (!$user->hasPermission('read_ip')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     *
     * @return mixed
     * @throws PermissionException
     */
    public function view(User $user): bool
    {
        if (!$user->hasPermission('read_ip')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     *
     * @return mixed
     */
    public function create(User $user): bool
    {
        if (!$user->hasPermission('create_ip')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     *
     * @return mixed
     * @throws PermissionException
     */
    public function update(User $user): bool
    {
        if (!$user->hasPermission('update_ip')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     *
     * @return mixed
     * @throws PermissionException
     */
    public function delete(User $user): bool
    {
        if (!$user->hasPermission('delete_ip')) {
            throw new PermissionException();
        }
        return true;
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param User $user
     * @param User $model
     *
     * @return mixed
     */
    public function restore(User $user, User $model)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param User $user
     * @param User $model
     *
     * @return mixed
     */
    public function forceDelete(User $user, User $model)
    {
        //
    }
}
