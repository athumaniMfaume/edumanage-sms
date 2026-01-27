<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    public function index(){
        $tenantId = Auth::user()->tenant_id;
        $students = Student::where('tenant_id', $tenantId)->get();
        return Inertia::render('student/index', compact('tenantId', 'students'));
    }

    public function store(Request $request){
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;
        Student::create($validated);
        return redirect()->route('students.index');
    }

    public function update(Request $request, $id){
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);

        $tenantId = Auth::user()->tenant_id;
        $student = Student::where('tenant_id', $tenantId)->findOrFail($id);
        $student->update($validated);
        return redirect()->route('students.index');
    }

    public function destroy($id){


        $tenantId = Auth::user()->tenant_id;
        $student = Student::where('tenant_id', $tenantId)->findOrFail($id);
        $student->delete();
        return redirect()->route('students.index');
    }
}
