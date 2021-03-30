<?php
/**
 *  app/Http/Resources/Api/v1/Issue/IssueResource.php
 *
 * Date-Time: 30.03.21
 * Time: 11:24
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Issue;

use Illuminate\Http\Resources\Json\JsonResource;

class IssueResource extends JsonResource
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
            'department' => $this->department,
            'name' => $this->name,
            'type' => $this->type,
            'status' => $this->status,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'createdBy' => $this->createdBy,
            'updatedBy' => $this->updatedBy,
        ];
    }
}
