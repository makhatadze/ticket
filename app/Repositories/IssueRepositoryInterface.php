<?php
/**
 *  app/Repositories/IssueRepositoryInterface.php
 *
 * Date-Time: 30.03.21
 * Time: 11:19
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Repositories;


use App\Http\Requests\Api\v1\DepartmentRequest;
use App\Http\Requests\Api\v1\IssueRequest;
use App\Http\Resources\Api\v1\Issue\IssueResource;

interface IssueRepositoryInterface
{
    /**
     * @param IssueRequest $request
     *
     */
    public function getData(IssueRequest $request);

    /**
     * Create new model
     *
     * @param IssueRequest $request
     *
     * @return IssueResource
     */
    public function createNewItem(IssueRequest $request): IssueResource;

    /**
     * Update issue item
     *
     * @param int $id
     * @param IssueRequest $request
     *
     * @return mixed
     */
    public function updateItem(int $id, IssueRequest $request): IssueResource;
}
