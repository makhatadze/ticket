<?php
/**
 *  app/Http/Resources/Api/v1/Department/DepartmentCollection.php
 *
 * Date-Time: 29.03.21
 * Time: 10:07
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Department;

use Illuminate\Http\Resources\Json\ResourceCollection;

class DepartmentCollection extends ResourceCollection
{
    private $pagination;

    public function __construct($resource)
    {
        $this->pagination = [
            'total' => $resource->total(),
            'count' => $resource->lastPage(),
            'current' => $resource->currentPage(),
            'pageSize' => $resource->perPage()
        ];


        $resource = $resource->getCollection();
        parent::__construct($resource);
    }

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(
                function ($department) {
                    return new DepartmentResource($department);
                }
            ),
            'pagination' => $this->pagination,
        ];
    }
}
