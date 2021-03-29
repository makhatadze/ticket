<?php
/**
 *  app/Repositories/Eloquent/DepartmentRepository.php
 *
 * Date-Time: 29.03.21
 * Time: 09:31
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Models\Department;
use App\Repositories\DepartmentRepositoryInterface;
use App\Repositories\Eloquent\Base\BaseRepository;

class DepartmentRepository extends BaseRepository implements DepartmentRepositoryInterface
{
    /**
     * DepartmentRepository constructor.
     *
     * @param Department $model
     */
    public function __construct(Department $model)
    {
        parent::__construct($model);
    }
}
