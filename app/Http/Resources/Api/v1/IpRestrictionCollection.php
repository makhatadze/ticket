<?php
/**
 *  app/Http/Resources/Api/v1/IpRestrictionCollection.php
 *
 * Date-Time: 19.03.21
 * Time: 11:08
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class IpRestrictionCollection extends ResourceCollection
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
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection->map(
                function ($ipRestriction) {
                    return new IpRestrictionResource($ipRestriction);
                }
            ),
            'pagination' => $this->pagination,
        ];
    }
}
