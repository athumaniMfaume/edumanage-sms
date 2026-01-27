<?php

use Inertia\Inertia;
use App\Models\Enrollment;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\EnrollmentController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', [DashboardController::class,'index'])->name('dashboard');


    Route::get('/teachers', [TeacherController::class,'index'])->name('teachers.index');
    Route::post('/teachers/create', [TeacherController::class,'store'])->name('teacher.store');
    Route::put('/teachers/update/{id}', [TeacherController::class,'update'])->name('teacher.update');
    Route::delete('/teachers/destroy/{id}', [TeacherController::class,'destroy'])->name('teacher.destroy');

    Route::get('/students', [StudentController::class,'index'])->name('students.index');
    Route::post('/students/create', [StudentController::class,'store'])->name('student.store');
    Route::put('/students/update/{id}', [StudentController::class,'update'])->name('student.update');
    Route::delete('/students/destroy/{id}', [StudentController::class,'destroy'])->name('student.destroy');


    Route::get('/courses', [CourseController::class,'index'])->name('courses.index');
    Route::post('/courses/create', [CourseController::class,'store'])->name('course.store');
    Route::put('/courses/update/{id}', [CourseController::class,'update'])->name('course.update');
    Route::delete('/courses/destroy/{id}', [CourseController::class,'destroy'])->name('course.destroy');


    Route::get('/enrollments', [EnrollmentController::class,'index'])->name('enrollments.index');
    Route::post('/enrollments/create', [EnrollmentController::class,'store'])->name('enrollment.store');
    Route::put('/enrollments/update/{id}', [EnrollmentController::class,'update'])->name('enrollment.update');
    Route::delete('/enrollments/destroy/{id}', [EnrollmentController::class,'destroy'])->name('enrollment.destroy');
});

require __DIR__.'/settings.php';
