<?php
/**
 *  app/Http/Controllers/Api/v1/IpRestrictionController.php
 *
 * Date-Time: 19.03.21
 * Time: 11:08
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Controllers\Api\v1;

use App\Exceptions\DeleteException;
use App\Exceptions\ValidationException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\IpRestrictionRequest;
use App\Http\Resources\Api\v1\IpRestrictionCollection;
use App\Http\Resources\Api\v1\IpRestrictionResource;
use App\Policies\IpRestrictionPolicy;
use App\Repositories\IpRestrictionRepositoryInterface;
use http\Exception;
use Illuminate\Http\JsonResponse;
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
        $attributes = $request->only('name', 'ip', 'status');

        $this->ipRestictionRepository = $this->ipRestictionRepository->create($attributes);

        return new IpRestrictionResource($this->ipRestictionRepository);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return IpRestrictionResource
     * @throws ValidationException
     */
    public function show(int $id)
    {
        $data = $this->ipRestictionRepository->findOrFail($id);
        return new IpRestrictionResource($data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param IpRestrictionRequest $request
     * @param int $id
     *
     * @return IpRestrictionResource|JsonResponse
     */
    public function update(IpRestrictionRequest $request, int $id)
    {
        $attributes = $request->only('name', 'ip', 'status');

        $this->ipRestictionRepository = $this->ipRestictionRepository->update($id, $attributes);

        return new IpRestrictionResource($this->ipRestictionRepository);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return IpRestrictionResource|JsonResponse
     * @throws DeleteException
     */
    public function destroy(int $id)
    {
        return new IpRestrictionResource($this->ipRestictionRepository->delete($id));
    }
}
