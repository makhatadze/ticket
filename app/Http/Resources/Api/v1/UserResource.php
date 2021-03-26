<?php
/**
 *  app/Http/Resources/Api/v1/UserResource.php
 *
 * Date-Time: 16.03.21
 * Time: 15:10
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'active' => $this->active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'role' => $this->roles()->first(['id','name','slug']),
            'permissions' => $this->permissions()->get(['id','name','slug'])->toArray()
        ];
    }
}
