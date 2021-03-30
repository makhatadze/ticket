<?php
/**
 *  app/Repositories/Eloquent/IssueRepository.php
 *
 * Date-Time: 30.03.21
 * Time: 11:18
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Models\Department;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\IssueRepositoryInterface;

class IssueRepository extends BaseRepository implements IssueRepositoryInterface
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
