<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Enrollment;
use App\Models\Tenant;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
public function index()
{
    $tenantId = Auth::user()->tenant_id;
    $isPostgres = DB::connection()->getDriverName() === 'pgsql';

    $tenantName = Tenant::where('tenant_id', $tenantId)->value('school_name');
    $totalEnrollments = Enrollment::where('tenant_id', $tenantId)->count();
    $totalCourses = Course::where('tenant_id', $tenantId)->count();
    $totalStudents = Student::where('tenant_id', $tenantId)->count();
    $totalTeachers = Teacher::where('tenant_id', $tenantId)->count();

    $totalSubjects = Teacher::where('tenant_id', $tenantId)
        ->distinct('subject')
        ->count('subject');

    // Dynamic Select based on Database Driver
    $monthFormat = $isPostgres 
        ? "TO_CHAR(enrollment_date, 'Mon')" 
        : "DATE_FORMAT(enrollment_date, '%b')";

    $enrollmentTrend = Enrollment::where('tenant_id', $tenantId)
        ->select([
            DB::raw("$monthFormat as month"),
            DB::raw('COUNT(*) as total'),
            DB::raw("MIN(enrollment_date) as sort_date")
        ])
        ->where('enrollment_date', '>=', now()->subMonths(6)->format('Y-m-d'))
        ->groupBy('month')
        // In Postgres, when grouping by 'month', order by the aggregate MIN(enrollment_date)
        ->orderBy(DB::raw("MIN(enrollment_date)"), 'ASC') 
        ->get();

    return Inertia::render('dashboard', [
        'tenant' => $tenantName,
        'totalEnrollments' => $totalEnrollments,
        'totalCourses' => $totalCourses,
        'totalStudents' => $totalStudents,
        'totalTeachers' => $totalTeachers,
        'totalSubjects' => $totalSubjects,
        'enrollmentTrend' => $enrollmentTrend,
    ]);
}
}

