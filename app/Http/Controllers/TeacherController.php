<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index(){
        $tenantId = Auth::user()->tenant_id;
        $teachers = Teacher::where('tenant_id', $tenantId)->get();
        return Inertia::render('teacher/index', compact('tenantId', 'teachers'));
    }

    public function store(Request $request){
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);

        $validated['tenant_id'] = Auth::user()->tenant_id;
        Teacher::create($validated);
        return redirect()->route('teachers.index');
    }

    public function update(Request $request, $id){
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);

        $tenantId = Auth::user()->tenant_id;
        $teacher = Teacher::where('tenant_id', $tenantId)->findOrFail($id);
        $teacher->update($validated);
        return redirect()->route('teachers.index');
    }

    public function destroy($id){


        $tenantId = Auth::user()->tenant_id;
        $teacher = Teacher::where('tenant_id', $tenantId)->findOrFail($id);
        $teacher->delete();
        return redirect()->route('teachers.index');
    }
}
