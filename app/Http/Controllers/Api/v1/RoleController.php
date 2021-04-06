<?php
/**
 *  app/Http/Controllers/Api/v1/RoleController.php
 *
 * Date-Time: 16.03.21
 * Time: 16:55
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Controllers\Api\v1;

use App\Exceptions\DeleteException;
use App\Exceptions\ValidationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\RoleRequest;
use App\Http\Resources\Api\v1\RoleCollection;
use App\Http\Resources\Api\v1\RolePermissionResource;
use App\Http\Resources\Api\v1\RoleResource;
use App\Models\Role;
use App\Repositories\RoleRepositoryInterface;
use http\Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoleController extends Controller
{

    /**
     * @var RoleRepositoryInterface
     */
    private $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        // Initialize roleRepository
        $this->roleRepository = $roleRepository;

        $this->authorizeResource(Role::class);
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
     * @param RoleRequest $request
     *
     * @return RoleCollection
     *
     */
    public function index(RoleRequest $request): RoleCollection
    {
        return new RoleCollection($this->roleRepository->getData($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param RoleRequest $request
     *
     * @return RoleResource
     */
    public function store(RoleRequest $request): RoleResource
    {
        return $this->roleRepository->createNewItem($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return ValidationException|RoleResource|Exception|JsonResponse
     * @throws ValidationException
     */
    public function show(int $id)
    {
        $data = $this->roleRepository->findOrFail($id);
        return new RoleResource($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param RoleRequest $request
     * @param int $id
     *
     * @return RoleResource|JsonResponse
     * @throws ValidationException
     */
    public function update(RoleRequest $request, int $id)
    {
        return $this->roleRepository->updateItem($id, $request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return RoleResource|JsonResponse
     * @throws DeleteException
     */
    public function destroy(int $id)
    {
        return new RoleResource($this->roleRepository->delete($id));
    }

    /**
     * Restore specified resource from storage.
     *
     * @param int $id
     *
     * @return RoleResource|JsonResponse
     * @throws ValidationException
     */
    public function restore(int $id)
    {
        return new RoleResource($this->roleRepository->restore($id));
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     *
     * @return AnonymousResourceCollection
     */
    public function getWithPermissions(Request $request): AnonymousResourceCollection
    {
        return RolePermissionResource::collection($this->roleRepository->all());
    }
    
    public function test()
    {
        return json_encode(['success']);
    }
}
