<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('books/filter', [BookController::class, 'filter']);

Route::apiResource('categories', CategoryController::class);
Route::apiResource('books', BookController::class);