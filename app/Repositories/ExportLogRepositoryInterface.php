<?php
/**
 *  app\Repositories\ExportRepositoryInterface.php
 *
 * Date-Time: 27.03.21
 * Time: 18:7
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories;

use App\Http\Requests\Api\v1\ExportLogRequest;

interface ExportLogRepositoryInterface
{
    /**
     * @param ExportLogRequest $request
     *
     */
    public function getData(ExportLogRequest $request);
}
