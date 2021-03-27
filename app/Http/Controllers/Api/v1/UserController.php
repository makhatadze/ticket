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
use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\UserRequest;
use App\Http\Resources\Api\v1\RoleResource;
use App\Http\Resources\Api\v1\UserCollection;
use App\Http\Resources\Api\v1\UserResource;
use App\Http\Resources\Api\v1\UserRolePermissionsResource;
use App\Models\ExportLog;
use App\Models\File;
use App\Models\User;
use App\Repositories\ExportLogRepositoryInterface;
use App\Repositories\UserRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;


class UserController extends Controller
{
    /**
     * @var UserRepositoryInterface
     */
    private $userRepository;
    /**
     * @var ExportLogRepositoryInterface
     */
    private $exportLogRepository;

    public function __construct(UserRepositoryInterface $userRepository, ExportLogRepositoryInterface $exportLogRepository)
    {
        $this->userRepository = $userRepository;
        $this->exportLogRepository = $exportLogRepository;

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
    public function show(UserRequest $request, int $id)
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
     * @param Request $request
     * @return BinaryFileResponse
     */
    public function exportToExcel(Request $request)
    {
        if ($request->filled('type')) {
            $userExport = (new UsersExport())
                ->setKeys($request['keys'])
                ->setUserIds($request['ids'])
                ->setType(intval($request['type']))
                ->setRequest($request);
            $extension = 'xlsx';
            $fileName = Carbon::now()->timestamp . '-users.' . $extension;
            $path = '/export/' . Carbon::now()->format('Y/m/d') . '/' . $fileName;
            $filePath = '/public'.$path;
            Excel::store($userExport,  $filePath);

            $exportLogModel = $this->exportLogRepository->create([
                'type' => ExportLog::EXPORT_USER
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
