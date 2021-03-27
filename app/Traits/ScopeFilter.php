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
use Illuminate\Http\Request;

trait ScopeFilter
{
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
    public function scopeIpAddress($query, $ipAddress) {
        return $query->where('ip-address', 'like', '%' . $ipAddress . '%');

    }

    /**
     * @param $query
     * @param $status
     * @return mixed
     */
    public function scopeStatus($query, $status) {
        return $query->where('status',  $status);
    }

    /**
     * @param $query
     * @param $active
     * @return mixed
     */
    public function scopeActive($query, $active) {
        return $query->where('active',  $active);
    }

    /**
     * @param $query
     * @param $startTime
     * @return mixed
     */
    public function scopeStartTime($query, $startTime) {
        return $query->where('created_at', '>=', $startTime);
    }

    /**
     * @param $query
     * @param $endTime
     * @return mixed
     */
    public function scopeEndTime($query, $endTime) {
        return $query->where('created_at', '<=', Carbon::parse($endTime)->addDay(1));
    }

}
