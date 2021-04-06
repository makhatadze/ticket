<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\v1\TestController;
use App\Http\Controllers\Api\v1\RoleController;
use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\IssueController;
use App\Http\Controllers\Api\v1\ExportLogController;
use App\Http\Controllers\Api\v1\DepartmentController;
use App\Http\Controllers\Api\v1\IpRestrictionController;

Route::middleware('ipMiddleware')->group(function () {
    
    Route::prefix('v1')->group(function () {
        
        Route::prefix('auth')->group(function () {
            Route::post('login', [AuthController::class, 'login']);
            Route::middleware('auth:api')->get('current-user', [AuthController::class, 'getCurrentUser']);
            Route::middleware('auth:api')->patch('change-password', [AuthController::class, 'changePassword']);
        });

        Route::middleware('auth:api')->group(function () {

            // Roles
            Route::post('role/{role}/restore', [RoleController::class, 'restore']);
            Route::apiResource('role', RoleController::class);
            Route::get('role-permission', [RoleController::class, 'getWithPermissions']);

            // Users
            Route::post('user/{user}/restore', [UserController::class, 'restore']);
            Route::post('user/export', [UserController::class, 'exportToExcel'])->middleware('can:userExport');
            Route::apiResource('user', UserController::class);

            // IpRestriction
            Route::post('ip-restriction/{ipRestriction}/restore', [IpRestrictionController::class, 'restore']);
            Route::post('ip-restriction/export', [IpRestrictionController::class, 'exportToExcel'])->middleware('can:ipRestrictionExport');
            Route::apiResource('ip-restriction', IpRestrictionController::class);

            // Department
            Route::apiResource('department', DepartmentController::class);

            // Issue
            Route::apiResource('issue', IssueController::class);

            // Export Log
            Route::get('export-log', [ExportLogController::class, 'index']);
            
            // Test
            Route::get('test', [TestController::class, 'index']);
            
        });
        
    });
    
});
