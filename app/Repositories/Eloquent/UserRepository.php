<?php
/**
 *  app/Repositories/Eloquent/UserRepository.php
 *
 * Date-Time: 17.03.21
 * Time: 11:55
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Http\Requests\Api\v1\UserRequest;
use App\Http\Resources\Api\v1\UserCollection;
use App\Http\Resources\Api\v1\UserResource;
use App\Models\User;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

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

    /**
     * @param UserRequest $request
     *
     * @return UserCollection
     */
    public function getData(UserRequest $request): UserCollection
    {
        $data = $this->model->query();

        $data = $data->paginate(10);
        return new UserCollection($data);
    }

    /**
     * Create new user
     *
     * @param UserRequest $request
     *
     * @return UserResource
     */
    public function createNewItem(UserRequest $request): UserResource
    {
        $attributes = $request->only('name', 'username','active');
        $attributes['password'] = Hash::make($request['password']);
        $this->model = $this->create($attributes);

        // Attach role
        $this->model->roles()->attach($request['role']);

        // Attach permissions
        $this->syncPermissions($request);

        return new UserResource($this->model);
    }

    /**
     * Update user item
     *
     * @param int $id
     * @param UserRequest $request
     *
     * @return mixed
     */
    public function updateItem(int $id, UserRequest $request): UserResource
    {
        $attributes = $request->only('name', 'username');
        if ($request['password'] !== null) {
            $attributes['password'] = Hash::make($request['password']);
        }
        $this->model = $this->update($id, $attributes);

        // Remove roles
        $this->model->roles()->detach();

        // Remove permissions
        $this->model->permissions()->detach();

        // Attach role
        $this->model->roles()->attach($request['role']);

        // Attach permissions
        $this->syncPermissions($request);

        return new UserResource($this->model);
    }

    /**
     *  Attach user permissions
     *
     * @param UserRequest $request
     *
     */
    protected function syncPermissions(UserRequest $request)
    {
        if ($request->has('permissions') && $this->model) {
            $this->model->permissions()->sync($request['permissions']);
        }
    }
}