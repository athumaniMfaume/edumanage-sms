import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';


interface Student{
    course_id: number,
    tenant_id: number,
    course_name: string,
    teacher_id: number,
}

interface Teacher{
    teacher_id: number,
    first_name: string,
    last_name: string,
}



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Courses',
        href: '/courses',
    }
];

const emptyForm = { course_name:'', teacher_id:''};

type formState = typeof emptyForm & {id?:number};

export default function CourseIndex() {
    const {courses, teachers} = usePage<{ courses?: Course[], teachers?: Teacher[]}>().props;

    const courseList = courses ?? [];
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = ()=>{
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (course: Course)=>{
        setForm({
            id: course.course_id,
            course_name: course.course_name,
            teacher_id: String(course.teacher_id),

        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = ()=>{
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        const payload = {...form, teacher_id: Number(form.teacher_id)};
        if (isEdit && form.id) {
            router.put(`/courses/update/${form.id}`, payload,{
                onSuccess: handleClose,
            });

        }else{
            router.post(`/courses/create`, payload, {
                onSuccess:handleClose,
            });
        };

    };


    const handleDelete = (id: number)=>{
        if (window.confirm('Are you sure you want to delete this course?')) {
                router.delete(`/courses/destroy/${id}`);
        }

    };

    const getTeacherName = (teacher_id: number) => {
        const teacher = teacherList.find(t => Number(t.teacher_id) === Number(teacher_id));
        return teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Unknown Teacher';
    }





    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="p-6 mt-6 ml-4 mr-4">
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='text-2xl font-bold'>Courses</h1>
                    <Button onClick={handleOpenAdd}> Add Course</Button>
                </div>
                <div className='overflow-x-auto'>
                    <table className='min-w-full border text-sm rounded-lg'>
                        <thead className='bg-gray-100 dark:bg-neutral-800'>
                            <tr>
                                <th className='px-4 py-2 text-left font-semibold'>ID</th>
                                <th className='px-4 py-2 text-left font-semibold'>Course Name</th>
                                <th className='px-4 py-2 text-left font-semibold'>Teacher</th>
                                <th className='px-4 py-2 text-left font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseList.map((course) => (
                                <tr key={course.course_id} className='border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700'>
                                    <td className='px-4 py-2'>{course.course_id}</td>
                                    <td className='px-4 py-2'>{course.course_name}</td>
                                    <td className='px-4 py-2'>{getTeacherName(course.teacher_id)}</td>
                                    <td className='px-4 py-2 flex gap-2'>
                                        <Button size='sm' variant='outline' onClick={()=> handleOpenEdit(course)}>Edit</Button>
                                        <Button size='sm' variant='destructive' onClick={()=> handleDelete(course.course_id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {isEdit ?  'Update Course' : 'Add Course'}

                            </DialogTitle>
                        </DialogHeader>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="first_name">Course Name</label>
                                <input className='border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition=[color, box-shadow outline-none md:text-sm' type="text"  id='course_name' name='course_name' value={form.course_name} onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="teacher_id">Teacher</label>
                                <select className='border-input flex h-9 w-full min-w-0 rounded-md border bg-dark px-3 py-1 text-base shadow-xs transition=[color, box-shadow outline-none md:text-sm'
                                name="teacher_id" id="teacher_id" value={form.teacher_id}
                                onChange={handleChange} required>
                                    <option value="" disabled>Select Teacher</option>
                                    {teacherList.map((teacher) => (
                                        <option key={teacher.teacher_id} value={teacher.teacher_id}>
                                            {teacher.first_name} {teacher.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex justify-end gap-2'>
                                <Button type='button' variant='outline' onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>{isEdit ?  'Update' : 'Add'}</Button>
                            </div>
                        </form>
                    </DialogContent>

                </Dialog>
            </Card>


        </AppLayout>
    );
}
