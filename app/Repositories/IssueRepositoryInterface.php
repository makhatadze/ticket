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
use App\Http\Resources\Api\v1\Department\DepartmentResource;

interface IssueRepositoryInterface
{
    /**
     * @param IssueRequest $request
     *
     */
    public function getData(IssueRequest $request);
}
