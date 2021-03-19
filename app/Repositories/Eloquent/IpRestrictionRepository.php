<?php
/**
 *  app/Repositories/Eloquent/IpRestrictionRepository.php
 *
 * Date-Time: 19.03.21
 * Time: 11:01
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent;

use App\Http\Requests\Api\v1\IpRestrictionRequest;
use App\Http\Resources\Api\v1\IpRestrictionCollection;
use App\Models\IpRestriction;
use App\Repositories\Eloquent\Base\BaseRepository;
use App\Repositories\IpRestrictionRepositoryInterface;

class IpRestrictionRepository extends BaseRepository implements IpRestrictionRepositoryInterface
{
    /**
     * IpRestrictionRepository constructor.
     *
     * @param IpRestriction $model
     */
    public function __construct(IpRestriction $model)
    {
        parent::__construct($model);
    }

    /**
     * @param IpRestrictionRequest $request
     *
     * @return IpRestrictionCollection
     */
    public function getData(IpRestrictionRequest $request): IpRestrictionCollection
    {
        $data = $this->model->query();

        $data = $data->paginate(10);
        return new IpRestrictionCollection($data);
    }
}