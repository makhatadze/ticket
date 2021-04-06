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

        // Remove permissions
        $this->model->permissions()->detach();

        // Attach permissions
        $this->syncPermissions($request);
        
        
        // იმ მომხარებელთა id-ები, რომლებთანაც დაკავშირებულია ეს როლი
        $user_ids = DB::table('users_roles')->select('user_id')->where('role_id',$id)->pluck('user_id');
        
        // მომხმარებლებთან დაკავშირებული უკვე არსებული ყველა უფლების წაშლა
        DB::table('users_permissions')->whereIn('user_id',$user_ids)->delete();
        
        // აქ შეინახება მომხმარებლისა და უფლებების ახალი წყვილები
        $new_permissions = [];
        
        foreach($user_ids as $user_id)
        {
            foreach($request->permissions as $permission_id)
            {
                $new_permissions[] = [
                    'user_id' => $user_id,
                    'permission_id' => $permission_id
                ];
            }
        }

        DB::table('users_permissions')->insert($data);  

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
