<?php
/**
 *  app/Http/Controllers/Api/v1/IpRestrictionController.php
 *
 * Date-Time: 19.03.21
 * Time: 11:08
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Controllers\Api\v1;

use App\Exceptions\DataNotFoundException;
use App\Exceptions\DeleteException;
use App\Exceptions\RestoreException;
use App\Exceptions\TrashException;
use App\Exceptions\ValidationException;
use App\Exports\IpRestrictionExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\IpRestrictionRequest;
use App\Http\Resources\Api\v1\IpRestrictionCollection;
use App\Http\Resources\Api\v1\IpRestrictionResource;
use App\Models\ExportLog;
use App\Models\File;
use App\Policies\IpRestrictionPolicy;
use App\Repositories\ExportLogRepositoryInterface;
use App\Repositories\IpRestrictionRepositoryInterface;
use Carbon\Carbon;
use http\Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class IpRestrictionController extends Controller
{
    /**
     * @var ExportLogRepositoryInterface
     */
    private $exportLogRepository;
    /**
     * @var IpRestrictionRepositoryInterface
     */
    private $ipRestrictionRepository;

    public function __construct(IpRestrictionRepositoryInterface $ipRestrictionRepository,ExportLogRepositoryInterface  $exportLogRepository)
    {
        $this->ipRestrictionRepository = $ipRestrictionRepository;
        $this->exportLogRepository = $exportLogRepository;

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
        return new IpRestrictionCollection($this->ipRestrictionRepository->getData($request));
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

        $this->ipRestrictionRepository = $this->ipRestrictionRepository->create($attributes);

        return new IpRestrictionResource($this->ipRestrictionRepository);
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
        $data = $this->ipRestrictionRepository->findOrFail($id);
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

        $this->ipRestrictionRepository = $this->ipRestrictionRepository->update($id, $attributes);

        return new IpRestrictionResource($this->ipRestrictionRepository);
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
        return new IpRestrictionResource($this->ipRestrictionRepository->delete($id));
    }

    /**
     * Restore specified resource from storage.
     *
     * @param int $id
     *
     * @return IpRestrictionResource|JsonResponse
     * @throws ValidationException|RestoreException|DataNotFoundException|TrashException
     */
    public function restore(int $id): IpRestrictionResource
    {
        return new IpRestrictionResource($this->ipRestrictionRepository->restore($id));
    }

    /**
     * @param Request $request
     * @return BinaryFileResponse
     */
    public function exportToExcel(Request $request)
    {
        if ($request->filled('type')) {
            $userExport = (new IpRestrictionExport())
                ->setKeys($request['keys'])
                ->setIpRestrictionIps($request['ids'])
                ->setType(intval($request['type']))
                ->setRequest($request);
            $extension = 'xlsx';
            $fileName = Carbon::now()->timestamp . '-ip-restriction.' . $extension;
            $path = '/export/' . Carbon::now()->format('Y/m/d') . '/' . $fileName;
            $filePath = '/public'.$path;
            Excel::store($userExport,  $filePath);

            $exportLogModel = $this->exportLogRepository->create([
                'type' => ExportLog::EXPORT_IP_RESTRICTION
            ]);

            $exportLogModel->file()->create([
                'name' => $fileName,
                'path' => $path,
                'format' => $extension,
                'type' => File::DEFAULT,
            ]);

            $fullPath = Storage::disk('local')->path($filePath);

            return response()->download($fullPath);
        }
    }
}
