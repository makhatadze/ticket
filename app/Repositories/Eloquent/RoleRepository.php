<?php
/**
 *  app/Repositories/Eloquent/RoleRepository.php
 *
 * Date-Time: 16.03.21
 * Time: 14:57
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use DB;
use App\Http\Requests\Api\v1\RoleRequest;
use App\Http\Resources\Api\v1\RoleCollection;
use App\Http\Resources\Api\v1\RoleResource;
use App\Models\Role;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\RoleRepositoryInterface;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{

    /**
     * RoleRepository constructor.
     *
     * @param Role $model
     */
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    /**
     * Create new role
     *
     * @param RoleRequest $request
     *
     * @return RoleResource
     */
    public function createNewItem(RoleRequest $request): RoleResource
    {
        $attributes = $request->only('name', 'slug');
        $this->model = $this->create($attributes);

        // Attach permissions
        $this->syncPermissions($request);

        return new RoleResource($this->model);
    }

    /**
     * Update role item
     *
     * @param int $id
     * @param RoleRequest $request
     *
     * @return mixed
     */
    public function updateItem(int $id, RoleRequest $request): RoleResource
    {
        $attributes = $request->only('name', 'slug');
        $this->model = $this->update($id, $attributes);

        // get old permissions
        $roleOldPermissions = $this->model->permissions()->pluck('id')->toArray();

        $newPermissions = array_values(array_diff($request['permissions'],$roleOldPermissions));
        $oldPermissions = array_values(array_diff($roleOldPermissions,$request['permissions']));

        // Attach permissions
        $this->syncPermissions($request);

        foreach ($this->model->users as $user) {
            if (count($oldPermissions)) {
                $user->permissions()->wherePivotIn('permission_id',$oldPermissions)->detach();
            }
            if (count($newPermissions)) {
                foreach ($newPermissions as $newPermission) {
                    $user->permissions()->attach($newPermission);
                }
            }
        }

        return new RoleResource($this->model);        
    }

    /**
     *  Attach roles permissions
     *
     * @param RoleRequest $request
     *
     */
    protected function syncPermissions(RoleRequest $request)
    {
        if ($request->has('permissions') && $this->model) {
            $this->model->permissions()->sync($request['permissions']);
        }
    }

}
