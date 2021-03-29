<?php
/**
 *  app/Http/Controllers/Api/v1/DepartmentController.php
 *
 * Date-Time: 29.03.21
 * Time: 09:38
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\DepartmentRequest;
use App\Http\Resources\Api\v1\Department\DepartmentCollection;
use App\Models\Department;
use App\Repositories\DepartmentRepositoryInterface;
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
}
