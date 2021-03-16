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
use App\Http\Resources\Api\v1\RoleCollection;
use App\Models\Role;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\RoleRepositoryInterface;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{

    /**
     * UserRepository constructor.
     *
     * @param Role $model
     */
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    /**
     * @param RoleRequest $request
     *
     * @return RoleCollection
     */
    public function getData(RoleRequest $request): RoleCollection
    {

    }

}