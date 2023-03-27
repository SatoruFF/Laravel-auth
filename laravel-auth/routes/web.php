<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard/edit', [ProfileController::class, 'edit'])->name('dashboard');
    Route::patch('/dashboard/update', [ProfileController::class, 'update'])->name('dashboard');
    Route::delete('/dashboard/destroy', [ProfileController::class, 'destroy'])->name('dashboard');
});

require __DIR__.'/auth.php';
