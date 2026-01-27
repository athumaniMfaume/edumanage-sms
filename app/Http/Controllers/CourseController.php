<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function index(){
        $tenantId = Auth::user()->tenant_id;
        $courses = Course::where('tenant_id', $tenantId)->get();
        $teachers = Teacher::where('tenant_id', $tenantId)->get();
        return Inertia::render('course/index', compact('tenantId', 'courses', 'teachers'));
    }

    public function store(Request $request){
        $validated = $request->validate([
            'course_name' => 'required|string|max:50',
            'teacher_id' => 'required|integer',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;
        Course::create($validated);
        return redirect()->route('courses.index');
    }

    public function update(Request $request, $id){
        $validated = $request->validate([
            'course_name' => 'required|string|max:50',
            'teacher_id' => 'required|integer',
        ]);

        $tenantId = Auth::user()->tenant_id;
        $course = Course::where('tenant_id', $tenantId)->findOrFail($id);
        $course->update($validated);
        return redirect()->route('courses.index');
    }

    public function destroy($id){


        $tenantId = Auth::user()->tenant_id;
        $course = Course::where('tenant_id', $tenantId)->findOrFail($id);
        $course->delete();
        return redirect()->route('courses.index');
    }
}
