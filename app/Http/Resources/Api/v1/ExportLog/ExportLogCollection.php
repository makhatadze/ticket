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
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
