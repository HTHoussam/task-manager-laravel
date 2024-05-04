<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Models\Task;
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


Route::inertia('/tasks/{id}', function ($task) {
    return Inertia::render('Details', ['task' => $task]);
})->middleware(['auth', 'verified'])->name('tasks.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/tasks/details/{task}', [TaskController::class, 'getTaskDetails'])->name('tasks.details')->middleware('auth');

require __DIR__ . '/auth.php';
