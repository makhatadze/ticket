<?php
/**
 *  app/Repositories/Eloquent/UserRepository.php
 *
 * Date-Time: 17.03.21
 * Time: 11:55
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Http\Requests\Api\v1\UserRequest;
use App\Http\Resources\Api\v1\UserCollection;
use App\Models\User;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    /**
     * UserRepository constructor.
     *
     * @param User $model
     */
    public function __construct(User $model)
    {
        parent::__construct($model);
    }

    /**
     * @param UserRequest $request
     *
     * @return UserCollection
     */
    public function getData(UserRequest $request): UserCollection
    {
        $data = $this->model->query();

        $data = $data->paginate(10);
        return new UserCollection($data);
    }
}