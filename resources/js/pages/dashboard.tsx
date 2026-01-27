import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    Users, Book, GraduationCap, BookOpen,
    ListChecks, School, TrendingUp, BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Cell
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

const stats = [
    {
        label: 'Total Students',
        icon: Users,
        key: 'totalStudents',
        description: 'Active enrollments',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'ring-blue-100 dark:ring-blue-800/30'
    },
    {
        label: 'Faculty',
        icon: GraduationCap,
        key: 'totalTeachers',
        description: 'Teaching staff',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
        borderColor: 'ring-indigo-100 dark:ring-indigo-800/30'
    },
    {
        label: 'Active Courses',
        icon: Book,
        key: 'totalCourses',
        description: 'Available programs',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
        borderColor: 'ring-emerald-100 dark:ring-emerald-800/30'
    },
    {
        label: 'Subjects',
        icon: BookOpen,
        key: 'totalSubjects',
        description: 'Curriculum items',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        borderColor: 'ring-amber-100 dark:ring-amber-800/30'
    },
    {
        label: 'Enrollments',
        icon: ListChecks,
        key: 'totalEnrollments',
        description: 'Current session',
        color: 'text-rose-600',
        bgColor: 'bg-rose-50 dark:bg-rose-900/20',
        borderColor: 'ring-rose-100 dark:ring-rose-800/30'
    },
];

export default function Dashboard() {
    const { auth, tenant, enrollmentTrend, totalStudents, totalTeachers, totalCourses, totalSubjects } = usePage().props as any;

    const renderStatValue = (val: any) => {
        if (typeof val === 'object' && val !== null) {
            return Array.isArray(val) ? val.length : "1";
        }
        return val ?? 0;
    };

    // Data for the distribution chart
    const distributionData = [
        { name: 'Students', value: totalStudents, fill: '#2563eb' },
        { name: 'Teachers', value: totalTeachers, fill: '#4f46e5' },
        { name: 'Courses', value: totalCourses, fill: '#10b981' },
        { name: 'Subjects', value: totalSubjects, fill: '#f59e0b' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="School Dashboard" />

            <div className="py-8 min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <School className="h-5 w-5" />
                                <span className="uppercase tracking-wider text-xs font-bold">EduManage Management System</span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
                                {tenant}
                            </h1>
                            <p className="text-muted-foreground font-medium">Welcome back, {auth.user.name}. Here's the institutional overview for January 2026.</p>
                        </div>
                        <div className="flex items-center gap-2 bg-white dark:bg-neutral-900 p-2 px-4 rounded-full border border-gray-100 dark:border-neutral-800 shadow-sm">
                             <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                             <span className="text-xs font-bold uppercase tracking-tight">Term Session Active</span>
                        </div>
                    </div>

                    {/* Premium Stats Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10'>
                        {stats.map(({ label, icon: IconComponent, key, description, color, bgColor, borderColor }) => (
                            <Card key={label} className='group border-none shadow-sm bg-white dark:bg-neutral-900 transition-all hover:shadow-md hover:-translate-y-1 duration-300'>
                                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                                    <div className={`p-2.5 rounded-xl ring-4 ${bgColor} ${borderColor} transition-transform group-hover:scale-110`}>
                                        <IconComponent className={`w-6 h-6 ${color}`} />
                                    </div>
                                    <TrendingUp className="w-4 h-4 text-neutral-300 dark:text-neutral-700" />
                                </CardHeader>
                                <CardContent>
                                    <div className='text-3xl font-black tracking-tight text-neutral-900 dark:text-white'>
                                        {renderStatValue(usePage().props[key])}
                                    </div>
                                    <p className='text-[10px] font-bold text-neutral-400 mt-1 uppercase tracking-widest'>{label}</p>
                                    <CardDescription className='text-xs mt-2 font-medium italic'>
                                        {description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Graphs Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                        {/* Enrollment Growth Chart (Main Graph) */}
                        <Card className="lg:col-span-2 border-none shadow-sm bg-white dark:bg-neutral-900 p-2">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" /> Enrollment Trends
                                </CardTitle>
                                <CardDescription>Monthly student registrations across {tenant}</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[350px] w-full pt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={enrollmentTrend}>
                                        <defs>
                                            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 500}} />
                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 500}} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="total"
                                            stroke="#2563eb"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorTotal)"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Summary Bar Chart */}
                        <Card className="border-none shadow-sm bg-white dark:bg-neutral-900 p-2">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <BarChart3 className="w-5 h-5 text-indigo-500" /> Stats Summary
                                </CardTitle>
                                <CardDescription>Comparison of current totals</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[350px] pt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={distributionData} layout="vertical">
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700}} width={70} />
                                        <Tooltip cursor={{fill: 'transparent'}} />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="mt-4 pt-4 border-t border-gray-50 dark:border-neutral-800">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground font-medium">Student/Teacher Ratio</span>
                                        <span className="font-bold text-primary">
                                            {(totalStudents / (totalTeachers || 1)).toFixed(1)}:1
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}
