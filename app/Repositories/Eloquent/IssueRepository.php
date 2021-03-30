<?php
/**
 *  app/Repositories/Eloquent/IssueRepository.php
 *
 * Date-Time: 30.03.21
 * Time: 11:18
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Http\Requests\Api\v1\IssueRequest;
use App\Http\Resources\Api\v1\Issue\IssueResource;
use App\Models\Department;
use App\Models\Issue;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\IssueRepositoryInterface;

class IssueRepository extends BaseRepository implements IssueRepositoryInterface
{
    /**
     * IssueRepository constructor.
     *
     * @param Department $model
     */
    public function __construct(Issue $model)
    {
        parent::__construct($model);
    }

    /**
     * Create new issue
     *
     * @param IssueRequest $request
     *
     * @return IssueResource
     */
    public function createNewItem(IssueRequest $request): IssueResource
    {
        $attributes = $request->only('department_id', 'name','status','type');
        $this->model = $this->create($attributes);

        // Attach departments
        $this->attachDepartments($request);

        return new IssueResource($this->model);
    }

    /**
     *  Attach departments
     *
     * @param IssueRequest $request
     *
     */
    protected function attachDepartments(IssueRequest $request): void
    {
        if ($this->model) {
            if ($request->has('departments')) {
                foreach ($request['departments'] as $department) {
                    $this->model->departments()->attach($department['id'],
                        ['type' => $department['type'],
                            'permission' => $department['permission']
                        ]);
                }
            }
        }
    }
}
