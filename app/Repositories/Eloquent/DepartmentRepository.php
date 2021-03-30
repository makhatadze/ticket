<?php
/**
 *  app/Repositories/Eloquent/DepartmentRepository.php
 *
 * Date-Time: 29.03.21
 * Time: 09:31
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Http\Requests\Api\v1\DepartmentRequest;
use App\Http\Resources\Api\v1\Department\DepartmentResource;
use App\Models\Department;
use App\Repositories\DepartmentRepositoryInterface;
use App\Repositories\Eloquent\Base\BaseRepository;

class DepartmentRepository extends BaseRepository implements DepartmentRepositoryInterface
{
    /**
     * DepartmentRepository constructor.
     *
     * @param Department $model
     */
    public function __construct(Department $model)
    {
        parent::__construct($model);
    }

    /**
     * Create new role
     *
     * @param DepartmentRequest $request
     *
     * @return DepartmentResource
     */
    public function createNewItem(DepartmentRequest $request): DepartmentResource
    {
        $attributes = $request->only('name', 'type');
        $this->model = $this->create($attributes);

        // Attach permissions
        $this->attachUsers($request);

        return new DepartmentResource($this->model);
    }

    /**
     *  Attach users department
     *
     * @param DepartmentRequest $request
     *
     */
    protected function attachUsers(DepartmentRequest $request): void
    {
        if ($this->model) {
            $heads = [];
            if ($request->has('heads')) {
                foreach ($request['heads'] as $head) {
                    $heads [] = $head;
                    $this->model->heads()->attach($head, ['type' => Department::DEPARTMENT_HEAD]);
                }
            }
            if ($request->has('members')) {
                foreach ($request['members'] as $member) {
                    if (in_array($member, $heads, true)) {
                        continue;
                    }
                    $this->model->members()->attach($member, ['type' => Department::DEPARTMENT_MEMBER]);

                }
            }
        }
    }
}
