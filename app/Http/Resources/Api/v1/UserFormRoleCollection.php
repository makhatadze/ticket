<?php
/**
 *  app/Http/Resources/Api/v1/RoleCollection.php
 *
 * Date-Time: 16.03.21
 * Time: 15:07
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Resources\Api\v1;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserFormRoleCollection extends ResourceCollection
{
    private $pagination;
    private $permissions;

    public function __construct($resource)
    {
        $this->pagination = [
            'total' => $resource->total(),
            'count' => $resource->lastPage(),
            'current' => $resource->currentPage(),
            'pageSize' => $resource->perPage()
        ];

        $this->permissions = Permission::all();

        $resource = $resource->getCollection();
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param Request $request
     * @return \Illuminate\Support\Collection
     */
    public function toArray($request)
    {
        return $this->collection->map(
                function ($role) {
                    return new RoleResource($role);
                }
            );
    }
}
