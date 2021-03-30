<?php
/**
 *  app/Http/Resources/Api/v1/ExportLog/ExportLogCollection.php
 *
 * Date-Time: 30.03.21
 * Time: 16:17
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\ExportLog;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ExportLogCollection extends ResourceCollection
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
                function ($exportLog) {
                    return new ExportLogResource($exportLog);
                }
            ),
            'pagination' => $this->pagination,
        ];
    }
}
