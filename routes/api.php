<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\RoleController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::middleware('auth:api')->get('current-user', [AuthController::class, 'getCurrentUser']);
    });

    Route::middleware('auth:api')->group(function () {

        // Roles
        Route::post('role/{role}/restore',[RoleController::class,'restore']);
        Route::apiResource('role', RoleController::class);
    });

});