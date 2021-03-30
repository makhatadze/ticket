<?php
/**
 *  app/Http/Controllers/Api/v1/IssueController.php
 *
 * Date-Time: 30.03.21
 * Time: 11:21
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\IssueRequest;
use App\Http\Resources\Api\v1\Issue\IssueCollection;
use App\Http\Resources\Api\v1\Issue\IssueResource;
use App\Models\Issue;
use App\Repositories\IssueRepositoryInterface;
use Illuminate\Http\Request;

class IssueController extends Controller
{
    /**
     * @var IssueRepositoryInterface
     */
    private $issueRepository;

    public function __construct(IssueRepositoryInterface $issueRepository) {
        $this->issueRepository = $issueRepository;

        $this->authorizeResource(Issue::class);

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
     * @param IssueRequest $request
     *
     * @return IssueCollection
     *
     */
    public function index(IssueRequest $request): IssueCollection
    {
        return new IssueCollection($this->issueRepository->getData($request));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param IssueRequest $request
     *
     * @return IssueResource
     */
    public function store(IssueRequest $request)
    {
        return $this->issueRepository->createNewItem($request);
    }
}
