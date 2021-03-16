<?php
/**
 *  app/Exceptions/TrashException.php
 *
 * Date-Time: 16.03.21
 * Time: 14:57
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class TrashException extends Exception
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
            'message' => "This item not exists in trash.",
            'status' => 400
        ],400);
    }
}
