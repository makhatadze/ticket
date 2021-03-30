<?php
/**
 *  app/Http/Resources/Api/v1/ExportLog/ExportLogResource.php
 *
 * Date-Time: 30.03.21
 * Time: 16:17
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Resources\Api\v1\ExportLog;

use Illuminate\Http\Resources\Json\JsonResource;

class ExportLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
