<?php
/**
 *  app/Http/Resources/Api/v1/Department/DepartmentRelationResource.php
 *
 * Date-Time: 30.03.21
 * Time: 09:51
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Department;

use App\Http\Resources\Api\v1\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentRelationResource extends JsonResource
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
            'type' => $this->type,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'createdBy' => $this->createdBy,
            'updatedBy' =>$this->updatedBy,
            'heads' => $this->heads()->get()->toArray(),
            'members' => $this->members()->get()->toArray(),
        ];
    }
}
