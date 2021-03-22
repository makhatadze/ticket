<?php
/**
 *  routes/web.php
 *
 * Date-Time: 15.03.21
 * Time: 12:31
 * @author Vito Makhatadze <vitomaxatadze@gmail.com>
 */
use Illuminate\Support\Facades\Route;


Route::middleware('ipMiddleware')->group(function () {
    Route::any('/{slug?}', function () {
        return view('welcome');
    });
});