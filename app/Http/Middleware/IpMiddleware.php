<?php
/**
 *  app/Http/Middleware/IpMiddlware.php
 *
 * Date-Time: 22.03.21
 * Time: 09:38
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Middleware;


use App\Models\IpRestriction;
use Closure;
use Illuminate\Http\Request;

class IpMiddleware
{
    /**
     * @param Request $request
     * @param Closure $next
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $ipAddress = $request->ip();

        if (!IpRestriction::where(['ip' => $ipAddress, 'status' => true])->exists()) {
           abort(500);
        }
        return $next($request);

    }

    /**
     * @param Request $request
     *
     * @return mixed
     */
    protected function getClientIpaddress(Request $request) {

        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
            $_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        }
        $client  = @$_SERVER['HTTP_CLIENT_IP'];
        $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
        $remote  = $_SERVER['REMOTE_ADDR'];

        if(filter_var($client, FILTER_VALIDATE_IP)){
            $clientIp = $client;
        }
        elseif(filter_var($forward, FILTER_VALIDATE_IP)){
            $clientIp = $forward;
        }
        else{
            $clientIp = $remote;
        }

        return $clientIp;
    }
}