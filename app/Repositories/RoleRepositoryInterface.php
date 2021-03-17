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
use App\Http\Resources\Api\v1\RoleCollection;
use App\Http\Resources\Api\v1\RoleResource;

interface RoleRepositoryInterface
{
    /**
     * @param RoleRequest $request
     *
     * @return RoleCollection
     */
    public function getData(RoleRequest $request): RoleCollection;

    /**
     * Create new model
     *
     * @param RoleRequest $request
     *
     * @return RoleResource
     */
    public function createNewItem(RoleRequest $request): RoleResource;

    /**
     * Update role item
     *
     * @param int $id
     * @param RoleRequest $request
     *
     * @return mixed
     */
    public function updateItem(int $id, RoleRequest $request): RoleResource;
}