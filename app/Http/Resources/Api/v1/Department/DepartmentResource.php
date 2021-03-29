<?php
/**
 *  app/Http/Resources/Api/v1/Department/DepartmentResource.php
 *
 * Date-Time: 29.03.21
 * Time: 12:01
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Department;

use App\Http\Resources\Api\v1\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
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
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
