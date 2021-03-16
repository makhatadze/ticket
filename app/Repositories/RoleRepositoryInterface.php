<?php
/**
 *  app/Repositories/RoleRepositoryInterface.php
 *
 * Date-Time: 16.03.21
 * Time: 14:55
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Repositories;

use App\Http\Requests\Api\v1\RoleRequest;

interface RoleRepositoryInterface
{
    /**
     * @param RoleRequest $request
     */
    public function getData(RoleRequest $request);
}