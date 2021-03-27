<?php
/**
 *  app\Traits\Filter.php
 *
 * Date-Time: 27.03.21
 * Time: 10:15
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Traits;


use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

trait ScopeFilter
{

    /**
     * @param  $request
     * @return Builder
     */
    public function filter( $request): Builder
    {
        $data = $this->query();
        $filterScopes = $this->getFilterScopes();
        foreach ($this->getActiveFilters($request) as $filter => $value) {
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

        return $data->sorted($sortParams);
    }

    /**
     * @param  $request
     * @return array
     */
    public function getActiveFilters($request): array
    {
        $activeFilters = [];
        foreach ($this->getFilterScopes() as $key => $value) {
            if ($request->filled($key)) {
                $activeFilters [$key] = $request->{$key};
            }
        }
        return $activeFilters;
    }

    /**
     * @param $query
     * @param array $sortParams
     * @return mixed
     */
    public function scopeSorted($query, array $sortParams)
    {
        return $query->orderBy($sortParams['sort'], $sortParams['order']);
    }

    /**
     * @param $query
     * @param $id
     * @return mixed
     */
    public function scopeId($query, $id)
    {
        return $query->where('id', $id);
    }

    /**
     * @param $query
     * @param $name
     * @return mixed
     */
    public function scopeName($query, $name)
    {
        return $query->where('name', 'like', '%' . $name . '%');
    }

    /**
     * @param $query
     * @param $username
     * @return mixed
     */
    public function scopeUsername($query, $username)
    {
        return $query->where('username', 'like', '%' . $username . '%');
    }

    /**
     * @param $query
     * @param $ipAddress
     * @return mixed
     */
    public function scopeIp($query, $ip)
    {
        return $query->where('ip', 'like', '%' . $ip . '%');

    }

    /**
     * @param $query
     * @param $status
     * @return mixed
     */
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * @param $query
     * @param $active
     * @return mixed
     */
    public function scopeActive($query, $active)
    {
        return $query->where('active', $active);
    }

    /**
     * @param $query
     * @param $startTime
     * @return mixed
     */
    public function scopeStartTime($query, $startTime)
    {
        return $query->where('created_at', '>=', $startTime);
    }

    /**
     * @param $query
     * @param $endTime
     * @return mixed
     */
    public function scopeEndTime($query, $endTime)
    {
        return $query->where('created_at', '<=', Carbon::parse($endTime)->addDay(1));
    }

}
