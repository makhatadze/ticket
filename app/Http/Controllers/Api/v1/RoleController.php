<?php
/**
 *  app/Http/Controllers/Api/v1/RoleController.php
 *
 * Date-Time: 16.03.21
 * Time: 16:55
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\RoleRequest;
use App\Http\Resources\Api\v1\RoleCollection;
use App\Http\Resources\Api\v1\RoleResource;
use App\Models\Role;
use App\Repositories\RoleRepositoryInterface;
use Illuminate\Http\Request;

class RoleController extends Controller
{
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
        return $this->roleRepository->getData($request);
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
}
