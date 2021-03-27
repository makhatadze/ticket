<?php
/**
 *  app/Repositories/Eloquent/Base/EloquentRepositoryInterface.php
 *
 * Date-Time: 16.03.21
 * Time: 14:52
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Repositories\Eloquent\Base;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;

/**
 * Interface EloquentRepositoryInterface
 * @package App\Repositories\Eloquent\Base
 */
interface EloquentRepositoryInterface
{

    /**
     * @param array $columns
     *
     * @return Collection
     */
    public function all(array $columns): ?Collection;

    /**
     * @param Request $request
     */
    public function getData(Request $request);

    /**
     * @param int $perPage
     * @param array $columns
     *
     * @return Paginator
     */
    public function paginate(int $perPage, array $columns): ?Paginator;

    /**
     * @param array $attributes
     *
     * @return Model
     */
    public function create(array $attributes): Model;

    /**
     * @param int $id
     * @param array $data
     * @param string $attribute
     *
     * @return Model
     */
    public function update(int $id, $data = [], $attribute = 'id'): Model;

    /**
     * @param integer $id
     *
     * @return Model
     */
    public function delete(int $id): Model;

    /**
     * @param integer $id
     *
     * @return Model
     */
    public function restore(int $id): Model;

    /**
     * @param integer $id
     * @param array $columns
     */
    public function find(int $id, $columns = ['*']);

    /**
     * @param string $field
     * @param mixed $value
     * @param string[] $columns
     */
    public function findBy(string $field, $value, $columns = ['*']);

    /**
     * @param integer $id
     * @param array $columns
     */
    public function findOrFail(int $id, $columns = ['*']);

    /**
     * @param integer $id
     *
     * @return Model
     */
    public function findTrash(int $id): Model;
}
