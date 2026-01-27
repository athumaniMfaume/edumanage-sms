import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';


interface Teacher{
    teacher_id: number,
    tenant_id: number,
    first_name: string,
    last_name: string,
    subject: string,
}



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    }
];

const emptyForm = { first_name:'', last_name:'', subject:''};

type formState = typeof emptyForm & {id?:number};

export default function TeacherIndex() {
    const {teachers} = usePage<{ teachers?: Teacher[]}>().props;
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = ()=>{
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (teacher: Teacher)=>{
        setForm({
            id: teacher.teacher_id,
            first_name: teacher.first_name,
            last_name: teacher.last_name,
            subject: teacher.subject,

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
        if (isEdit && form.id) {
            router.put(`/teachers/update/${form.id}`, form,{
                onSuccess: handleClose,
            });

        }else{
            router.post(`/teachers/create`, form, {
                onSuccess:handleClose,
            });
        };

    };


    const handleDelete = (id: number)=>{
        if (window.confirm('Are you sure you want to delete this teacher?')) {
                router.delete(`/teachers/destroy/${id}`);
        }

    };





    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="p-6 mt-6 ml-4 mr-4">
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='text-2xl font-bold'>Teachers</h1>
                    <Button onClick={handleOpenAdd}> Add Teacher</Button>
                </div>
                <div className='overflow-x-auto'>
                    <table className='min-w-full border text-sm rounded-lg'>
                        <thead className='bg-gray-100 dark:bg-neutral-800'>
                            <tr>
                                <th className='px-4 py-2 text-left font-semibold'>ID</th>
                                <th className='px-4 py-2 text-left font-semibold'>FirstName</th>
                                <th className='px-4 py-2 text-left font-semibold'>LastName</th>
                                <th className='px-4 py-2 text-left font-semibold'>Subject</th>
                                <th className='px-4 py-2 text-left font-semibold'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teacherList.map((teacher) => (
                                <tr key={teacher.teacher_id} className='border-b last:border-0 hover:bg-gray-50 dark:hover:bg-neutral-700'>
                                    <td className='px-4 py-2'>{teacher.teacher_id}</td>
                                    <td className='px-4 py-2'>{teacher.first_name}</td>
                                    <td className='px-4 py-2'>{teacher.last_name}</td>
                                    <td className='px-4 py-2'>{teacher.subject}</td>
                                    <td className='px-4 py-2 flex gap-2'>
                                        <Button size='sm' variant='outline' onClick={()=> handleOpenEdit(teacher)}>Edit</Button>
                                        <Button size='sm' variant='destructive' onClick={()=> handleDelete(teacher.teacher_id)}>Delete</Button>
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
                                {isEdit ?  'Update Teacher' : 'Add Teacher'}

                            </DialogTitle>
                        </DialogHeader>
                        <form className='space-y-4' onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="first_name">First Name</label>
                                <input className='border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition=[color, box-shadow outline-none md:text-sm' type="text"  id='first_name' name='first_name' value={form.first_name} onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="last_name">Last Name</label>
                                <input className='border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition=[color, box-shadow outline-none md:text-sm' type="text"  id='last_name' name='last_name' value={form.last_name} onChange={handleChange} required/>
                            </div>
                            <div>
                                <label htmlFor="subject">Subject</label>
                                <input className='border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition=[color, box-shadow outline-none md:text-sm' type="text"  id='subject' name='subject' value={form.subject} onChange={handleChange} required/>
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
