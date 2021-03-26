<?php
/**
 *  app/Http/Resources/Api/v1/UserRolePermissionsResource.php
 *
 * Date-Time: 26.03.21
 * Time: 09:46
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1;

use App\Models\Role;
use App\Repositories\RoleRepositoryInterface;
use Illuminate\Http\Resources\Json\JsonResource;

class UserRolePermissionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->email,
            'active' => $this->active,
            'role' => $this->roles()->get(['id','name','slug'])->toArray(),
            'permissions' => $this->permissions()->get(['id','name','slug'])->toArray(),
            'roles' => RolePermissionResource::collection(Role::all())
        ];
    }
}
