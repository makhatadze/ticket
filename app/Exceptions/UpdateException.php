<?php
/**
 *  app/Exceptions/UpdateException.php
 *
 * Date-Time: 17.03.21
 * Time: 11:03
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class UpdateException extends Exception
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
            'message' => "Can not updated.",
            'status' => 400
        ],400);
    }}
