<?php
/**
 *  app/Repositories/Eloquent/RoleRepository.php
 *
 * Date-Time: 16.03.21
 * Time: 14:57
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Http\Requests\Api\v1\RoleRequest;
use App\Http\Resources\Api\v1\RoleCollection;
use App\Http\Resources\Api\v1\RoleResource;
use App\Models\Role;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\RoleRepositoryInterface;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{

    /**
     * UserRepository constructor.
     *
     * @param Role $model
     */
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    /**
     * @param RoleRequest $request
     *
     * @return RoleCollection
     */
    public function getData(RoleRequest $request): RoleCollection
    {
        $data = $this->model->query();

        $data = $data->paginate(10);
        return new RoleCollection($data);
    }

    /**
     * Create new role
     *
     * @param array $attributes
     *
     * @return RoleResource
     */
    public function createNewItem(RoleRequest $request): RoleResource
    {
        $attributes = $request->only('name', 'slug');
        $this->model = $this->create($attributes);

        // Attach permissions
        $this->syncPermissions($request);

        return new RoleResource($this->model);
    }

    /**
     * Update role item
     *
     * @param int $id
     * @param RoleRequest $request
     *
     * @return mixed
     */
    public function updateItem(int $id, RoleRequest $request): RoleResource
    {
        $attributes = $request->only('name', 'slug');
        $this->model = $this->update($id, $attributes);

        // Remove permissions
        $this->model->permissions()->detach();

        // Attach permissions
        $this->syncPermissions($request);

        return new RoleResource($this->model);
    }

    /**
     *  Attach roles permissions
     *
     * @param RoleRequest $request
     *
     */
    protected function syncPermissions(RoleRequest $request)
    {
        if ($request->has('permissions') && $this->model) {
            $this->model->permissions()->sync($request['permissions']);
        }
    }

}