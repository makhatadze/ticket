<?php
/**
 *  app/Repositories/DepartmentRepositoryInterface.php
 *
 * Date-Time: 29.03.21
 * Time: 09:30
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Repositories;


use App\Http\Requests\Api\v1\DepartmentRequest;
use App\Http\Resources\Api\v1\Department\DepartmentResource;

interface DepartmentRepositoryInterface
{
    /**
     * @param DepartmentRequest $request
     *
     */
    public function getData(DepartmentRequest $request);

    /**
     * Create new model
     *
     * @param DepartmentRequest $request
     *
     * @return DepartmentResource
     */
    public function createNewItem(DepartmentRequest $request): DepartmentResource;


    /**
     * Update department item
     *
     * @param int $id
     * @param DepartmentRequest $request
     *
     * @return mixed
     */
    public function updateItem(int $id, DepartmentRequest $request): DepartmentResource;
}
