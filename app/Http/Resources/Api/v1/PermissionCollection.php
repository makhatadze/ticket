<?php
/**
 *  app/Http/Resources/Api/v1/PermissionCollection.php
 *
 * Date-Time: 17.03.21
 * Time: 10:17
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Resources\Api\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Collection;

class PermissionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param Request $request
     *
     * @return Collection
     */
    public function toArray($request)
    {
        return $this->collection;
    }
}
