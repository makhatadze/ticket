<?php
/**
 *  app/Exceptions/RestoreException.php
 *
 * Date-Time: 19.03.21
 * Time: 12:01
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class RestoreException extends Exception
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
            'message' => 'Resource can not restore',
            'status' => 400
        ], 400);
    }
}
