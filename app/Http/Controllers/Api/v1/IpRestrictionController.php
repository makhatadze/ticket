<?php
/**
 *  app/Http/Controllers/Api/v1/IpRestrictionController.php
 *
 * Date-Time: 19.03.21
 * Time: 11:08
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\IpRestrictionRequest;
use App\Http\Resources\Api\v1\IpRestrictionCollection;
use App\Http\Resources\Api\v1\IpRestrictionResource;
use App\Policies\IpRestrictionPolicy;
use App\Repositories\IpRestrictionRepositoryInterface;
use Illuminate\Http\Request;

class IpRestrictionController extends Controller
{
    private $ipRestictionRepository;

    public function __construct(IpRestrictionRepositoryInterface $ipRestictionRepository)
    {
        $this->ipRestictionRepository = $ipRestictionRepository;

        $this->authorizeResource(IpRestrictionPolicy::class);
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
     * @param IpRestrictionRequest $request
     *
     * @return IpRestrictionCollection
     *
     */
    public function index(IpRestrictionRequest $request): IpRestrictionCollection
    {
        return $this->ipRestictionRepository->getData($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param IpRestrictionRequest $request
     *
     * @return IpRestrictionResource
     */
    public function store(IpRestrictionRequest $request): IpRestrictionResource
    {
        $attributes = $request->only('name','ip','status');

        $this->ipRestictionRepository = $this->ipRestictionRepository->create($attributes);

        return new IpRestrictionResource($this->ipRestictionRepository);
    }
}
