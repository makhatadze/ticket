<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        // If user is guest return error code.
        if (! $request->expectsJson()) {
            abort(response()->json([
                'error' => [
                    'message' => 'Unauthorized',
                    'status' => 401
                ]
            ],401));
        }
    }
}
