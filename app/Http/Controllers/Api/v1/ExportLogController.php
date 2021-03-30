<?php
/**
 *  app/Http/Controllers/Api/v1/ExportLogController.php
 *
 * Date-Time: 30.03.21
 * Time: 16:25
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\ExportLogRequest;
use App\Http\Resources\Api\v1\ExportLog\ExportLogCollection;
use App\Models\ExportLog;
use App\Repositories\ExportLogRepositoryInterface;
use Illuminate\Http\Request;

class ExportLogController extends Controller
{
    /**
     * @var ExportLogRepositoryInterface
     */
    private $exportLogRepository;

    public function __construct(ExportLogRepositoryInterface $exportLogRepository)
    {
        $this->$exportLogRepository = $exportLogRepository;

        $this->authorizeResource(ExportLog::class);
    }

    /**
     * Get the list of resource methods which do not have model parameters.
     *
     * @return array
     */
    protected function resourceMethodsWithoutModels(): array
    {
        return ['index'];
    }

    /**
     * Display a listing of the resource.
     *
     * @param ExportLogRequest $request
     *
     * @return ExportLogCollection
     *
     */
    public function index(ExportLogRequest $request): ExportLogCollection
    {
        return new ExportLogCollection($this->exportLogRepository->getData($request));
    }
}
