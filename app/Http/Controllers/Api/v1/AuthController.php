<?php
/**
 *  app/Http/Controllers/Api/v1/AuthController.php
 *
 * Date-Time: 15.03.21
 * Time: 11:33
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\v1\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param LoginRequest $request
     *
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        // take out only need parameters.
        $credentials = $request->only('username','password');

        // Add validation where status true.
        $credentials = array_merge($credentials,['active'=>User::ACTIVE,'deleted_at' => null]);

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(compact(['error' => 'Could not create credentials']));
        }
        return response()->json(compact('token'));
    }

    /**
     * Get the authenticated User.
     *
     * @return JsonResponse
     */
    public function getCurrentUser(): JsonResponse
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }

        } catch (TokenExpiredException $e) {
            return response()->json(['Token Expired'], 403);
        } catch (TokenInvalidException $e) {
            return response()->json(['Token Invalid'], 401);
        } catch (JWTException $e) {
            return response()->json(['Token Absent'], 500);
        }
        return response()->json([
            'user' => $user,
            'permissions' => [],
            'roles' => [],
        ]);
    }
}



