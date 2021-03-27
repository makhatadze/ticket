<?php
/**
 *  app/Repositories/Eloquent/Base/BaseRepository.php
 *
 * Date-Time: 16.03.21
 * Time: 14:52
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent\Base;

use App\Exceptions\DataNotFoundException;
use App\Exceptions\DeleteException;
use App\Exceptions\RestoreException;
use App\Exceptions\TrashException;
use App\Exceptions\UpdateException;
use App\Exceptions\ValidationException;
use App\Models\IpRestriction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

class BaseRepository implements EloquentRepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * Class Constructor
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Get all
     *
     * @param array $columns
     *
     * @return Collection
     */
    public function all($columns = ["*"]): Collection
    {
        return $this->model->get($columns);
    }

    /** Get Data with pagination
     *
     * @param Request $request
     * @return mixed
     */
    public function getData(Request $request) {
        $data = $this->model->query();

        $filterScopes = $this->model->getFilterScopes();
        $activeFilters = $this->model->getActiveFilters($request);

        foreach ($activeFilters as $filter => $value) {
            if (!array_key_exists($filter, $filterScopes)) {
                continue;
            }
            $filterScopeData = $filterScopes[$filter];

            if (false === $filterScopeData['hasParam']) {
                $data->{$value}();
                continue;
            }
            $methodToExecute = $filterScopeData['scopeMethod'];
            $data->{$methodToExecute}($value);
        }

        $sortParams = ['sort' => 'id','order' => 'desc'];

        if ($request->filled('sort') && $request->filled('order')) {
            $sortParams = $request->only('sort','order');
        }

        $perPage = 10;

        if ($request->filled('per_page')) {
            $perPage = $request['per_page'];
        }

        return $data->sorted($sortParams)->paginate($perPage);
    }

    /**
     * Paginate all
     *
     * @param integer $perPage
     * @param array $columns
     *
     * @return Paginator
     */
    public function paginate($perPage = 15, $columns = ['*']): Paginator
    {
        return $this->model->paginate($perPage, $columns);
    }

    /**
     * Create new model
     *
     * @param array $attributes
     *
     * @return Model
     */
    public function create($attributes = []): Model
    {
        return $this->model->create($attributes);
    }

    /**
     * Update model by the given ID
     *
     * @param integer $id
     * @param array $data
     * @param string $attribute
     *
     * @return mixed
     * @throws UpdateException|ValidationException
     */
    public function update(int $id, $data = [], $attribute = 'id'): Model
    {
        $this->model = $this->findOrFail($id);
        if (!$this->model->update($data)) {
            throw new UpdateException();
        }
        return $this->model;
    }

    /**
     * Delete model by the given ID
     *
     * @param integer $id
     *
     * @return Model
     * @throws DeleteException
     * @throws TrashException
     * @throws ValidationException
     */
    public function delete(int $id): Model
    {
        $this->model = $this->findOrFail($id);
        if (!$this->model->destroy($id)) {
            throw new DeleteException();
        }

        return $this->findTrash($id);
    }

    /**
     * Restore model by the given ID
     *
     * @param integer $id
     *
     * @return Model
     * @throws TrashException
     * @throws RestoreException
     */
    public function restore(int $id): Model
    {
        $this->model = $this->findTrash($id);
        if (!$this->model->restore()) {
            throw new RestoreException();
        }
        return $this->model;
    }


    /**
     * Find model by the given ID
     *
     * @param integer $id
     * @param array $columns
     *
     * @return mixed
     */
    public function find(int $id, $columns = ['*'])
    {
        return $this->model->find($id, $columns);
    }

    /**
     * Find model by a specific column
     *
     * @param string $field
     * @param mixed $value
     * @param array $columns
     *
     * @return mixed
     */
    public function findBy(string $field, $value, $columns = ['*'])
    {
        return $this->model->where($field, $value)->first($columns);
    }

    /**
     * Find model by the given ID
     *
     * @param integer $id
     * @param array $columns
     *
     * @return mixed
     * @throws ValidationException
     */
    public function findOrFail(int $id, $columns = ['*'])
    {
        $data = $this->model->find($id, $columns);
        if (!$data) {
            throw new DataNotFoundException();
        }
        return $data;
    }

    /**
     * Find model by the given ID
     *
     * @param integer $id
     * @param array $columns
     *
     * @return mixed
     * @throws ValidationException
     */
    public function firstOrFail(int $id, $columns = ['*'])
    {
        $data = $this->model->firstOrFail($id, $columns);
        if (!$data) {
            throw new DataNotFoundException();
        }
        return $data;
    }

    /**
     * Restore model by the given ID
     *
     * @param integer $id
     *
     * @return Model
     * @throws TrashException
     */
    public function findTrash(int $id): Model
    {
        $model = $this->model->withTrashed()->find($id);
        if (null === $model) {
            throw new TrashException();
        }

        if (null === $model->deleted_at) {
            throw new TrashException();
        }
        return $model;
    }
}
