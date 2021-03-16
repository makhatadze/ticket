<?php
/**
 *  app/Exceptions/PermissionException.php
 *
 * Date-Time: 16.03.21
 * Time: 17:01
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class PermissionException extends Exception
{
    public function report()
    {
        //
    }

    /**
     * Return json error for dataNotFound
     *
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'message' => "You don't have access.",
            'status' => 403
        ],403);
    }}
