<?php
/**
 *  app/Repositories/Eloquent/UserRepository.php
 *
 * Date-Time: 17.03.21
 * Time: 11:55
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

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
}