<?php
/**
 *  app/Http/Controllers/Api/v1/DepartmentController.php
 *
 * Date-Time: 29.03.21
 * Time: 09:38
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\v1;

use App\Exceptions\DeleteException;
use App\Exceptions\ValidationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\DepartmentRequest;
use App\Http\Resources\Api\v1\Department\DepartmentCollection;
use App\Http\Resources\Api\v1\Department\DepartmentRelationResource;
use App\Http\Resources\Api\v1\Department\DepartmentResource;
use App\Http\Resources\Api\v1\RoleResource;
use App\Models\Department;
use App\Repositories\DepartmentRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * @var DepartmentRepositoryInterface
     */
    private $departmentRepository;

    public function __construct(DepartmentRepositoryInterface $departmentRepository) {
        $this->departmentRepository = $departmentRepository;

        $this->authorizeResource(Department::class);

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
     * @param DepartmentRequest $request
     *
     * @return DepartmentCollection
     *
     */
    public function index(DepartmentRequest $request): DepartmentCollection
    {
        return new DepartmentCollection($this->departmentRepository->getData($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param DepartmentRequest $request
     *
     * @return DepartmentResource
     */
    public function store(DepartmentRequest $request): DepartmentResource
    {
        return $this->departmentRepository->createNewItem($request);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return DepartmentRelationResource
     * @throws ValidationException
     */
    public function show(int $id)
    {
        $data = $this->departmentRepository->findOrFail($id);
        return new DepartmentRelationResource($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param DepartmentRequest $request
     * @param int $id
     *
     * @return RoleResource|JsonResponse
     */
    public function update(DepartmentRequest $request, int $id)
    {
        return $this->departmentRepository->updateItem($id, $request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return DepartmentResource|JsonResponse
     * @throws DeleteException
     */
    public function destroy(int $id)
    {
        return new DepartmentResource($this->departmentRepository->delete($id));
    }

    /**
     * Restore specified resource from storage.
     *
     * @param int $id
     *
     * @return DepartmentResource|JsonResponse
     * @throws ValidationException
     */
    public function restore(int $id)
    {
        return new DepartmentResource($this->departmentRepository->restore($id));
    }
}
