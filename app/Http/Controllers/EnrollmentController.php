<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Student;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function index(){
        $tenantId = Auth::user()->tenant_id;
        $enrollments = Enrollment::where('tenant_id', $tenantId)->get();
        $courses = Course::where('tenant_id', $tenantId)->get();
        $students = Student::where('tenant_id', $tenantId)->get();
        return Inertia::render('enrollment/index', compact('tenantId','enrollments','courses','students'));
    }

    public function store(Request $request){
        $validated = $request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;
        Enrollment::create($validated);
        return redirect()->route('enrollments.index');
    }

    public function update(Request $request, $id){
        $validated = $request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);

        $tenantId = Auth::user()->tenant_id;
        $enrollment = Enrollment::where('tenant_id', $tenantId)->findOrFail($id);
        $enrollment->update($validated);
        return redirect()->route('enrollments.index');
    }

    public function destroy($id){


        $tenantId = Auth::user()->tenant_id;
        $enrollment = Enrollment::where('tenant_id', $tenantId)->findOrFail($id);
        $enrollment->delete();
        return redirect()->route('enrollments.index');
    }
}
