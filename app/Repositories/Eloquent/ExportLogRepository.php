<?php
/**
 *  app/Repositories/Eloquent/RoleRepository.php
 *
 * Date-Time: 16.03.21
 * Time: 14:57
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Http\Requests\Api\v1\RoleRequest;
use App\Http\Resources\Api\v1\ExportLogResource;
use App\Http\Resources\Api\v1\RoleCollection;
use App\Http\Resources\Api\v1\RoleResource;
use App\Models\ExportLog;
use App\Models\Role;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\ExportLogRepositoryInterface;
use App\Repositories\RoleRepositoryInterface;

class ExportLogRepository extends BaseRepository implements ExportLogRepositoryInterface
{

    /**
     * RoleRepository constructor.
     *
     * @param ExportLog $model
     */
    public function __construct(ExportLog $model)
    {
        parent::__construct($model);
    }



}
