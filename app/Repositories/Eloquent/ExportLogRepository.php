<?php
/**
 *  app/Repositories/Eloquent/RoleRepository.php
 *
 * Date-Time: 16.03.21
 * Time: 14:57
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Models\ExportLog;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\ExportLogRepositoryInterface;

class ExportLogRepository extends BaseRepository implements ExportLogRepositoryInterface
{

    /**
     * ExportLogRepository constructor.
     *
     * @param ExportLog $model
     */
    public function __construct(ExportLog $model)
    {
        parent::__construct($model);
    }

}
