<?php
/**
 *  app/Exceptions/DeleteException.php
 *
 * Date-Time: 19.03.21
 * Time: 11:54
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class DeleteException extends Exception
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
            'message' => 'Can not deleted',
            'status' => 400
        ],400);
    }
}
