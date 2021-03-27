<?php
/**
 *  app/Http/Controllers/Api/v1/UserController.php
 *
 * Date-Time: 17.03.21
 * Time: 11:58
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\v1;

use App\Exceptions\DeleteException;
use App\Exceptions\ValidationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\UserRequest;
use App\Http\Resources\Api\v1\RoleResource;
use App\Http\Resources\Api\v1\UserCollection;
use App\Http\Resources\Api\v1\UserResource;
use App\Http\Resources\Api\v1\UserRolePermissionsResource;
use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;


class UserController extends Controller
{
    private $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;

        $this->authorizeResource(User::class);
    }

    /**
     * Get the list of resource methods which do not have model parameters.
     *
     * @return array
     */
    protected function resourceMethodsWithoutModels(): array
    {
        return ['index', 'store', 'update', 'destroy', 'show', 'restore'];
    }

    /**
     * Display a listing of the resource.
     *
     * @param UserRequest $request
     *
     * @return UserCollection
     */
    public function index(UserRequest $request): UserCollection
    {
        return new UserCollection($this->userRepository->getData($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param UserRequest $request
     *
     * @return UserResource
     */
    public function store(UserRequest $request): UserResource
    {
        return $this->userRepository->createNewItem($request);
    }

    /**
     * Display the specified resource.
     *
     * @param UserRequest $request
     * @param int $id
     *
     * @return UserRolePermissionsResource
     * @throws ValidationException
     */
    public function show(UserRequest $request,int $id)
    {
        $data = $this->userRepository->findOrFail($id);
        if ($request['roles-permissions']) {
            return new UserRolePermissionsResource($data);
        }
        return new UserResource($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UserRequest $request
     * @param int $id
     *
     * @return RoleResource|JsonResponse
     */
    public function update(UserRequest $request, int $id)
    {
        return $this->userRepository->updateItem($id, $request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return UserResource|JsonResponse
     * @throws DeleteException
     */
    public function destroy(int $id)
    {
        return new UserResource($this->userRepository->delete($id));
    }

    /**
     * Restore specified resource from storage.
     *
     * @param int $id
     *
     * @return UserResource|JsonResponse
     * @throws ValidationException
     */
    public function restore(int $id)
    {
        return new UserResource($this->userRepository->restore($id));
    }

    /**
     * @param UserRequest $request
     */
    public function exportToExcel(UserRequest $request) {
    }

}
