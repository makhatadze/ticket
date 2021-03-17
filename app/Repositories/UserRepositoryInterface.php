<?php
/**
 *  app/Repositories/UserRepositoryInterface.php
 *
 * Date-Time: 17.03.21
 * Time: 11:58
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Repositories;



use App\Http\Requests\Api\v1\UserRequest;
use App\Http\Resources\Api\v1\UserCollection;

interface UserRepositoryInterface
{
    /**
     * @param UserRequest $request
     *
     * @return UserCollection
     */
    public function getData(UserRequest $request): UserCollection;
}