<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\IpRestrictionController;
use App\Http\Controllers\Api\v1\RoleController;
use App\Http\Controllers\Api\v1\UserController;
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

        // Users
        Route::post('user/{user}/restore',[UserController::class,'restore']);
        Route::apiResource('user', UserController::class);

        // IpRestriction
        Route::post('ip-restriction/{ipRestriction}/restore',[IpRestrictionController::class,'restore']);
        Route::apiResource('ip-restriction', IpRestrictionController::class);
    });

});