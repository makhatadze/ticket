<?php
/**
 *  app/Http/Resources/Api/v1/Issue/IssueCollection.php
 *
 * Date-Time: 30.03.21
 * Time: 11:23
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\Issue;

use Illuminate\Http\Resources\Json\ResourceCollection;

class IssueCollection extends ResourceCollection
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
                function ($issue) {
                    return new IssueResource($issue);
                }
            ),
            'pagination' => $this->pagination,
        ];
    }
}
