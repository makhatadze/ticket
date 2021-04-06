<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;

class TestController extends Controller
{
    public function index()
    {
        return json_encode(['success']);
    }
}
