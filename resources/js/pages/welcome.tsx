import { dashboard, login, register } from '@/routes';
import type { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { School, Users, Calendar, BarChart3, ShieldCheck, GraduationCap } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            title: "Student Information System",
            description: "Centralized database for student profiles, academic history, and medical records.",
            icon: Users,
            color: "text-blue-500"
        },
        {
            title: "Academic & Attendance Tracking",
            description: "Automated attendance monitoring and comprehensive gradebook management.",
            icon: Calendar,
            color: "text-green-500"
        },
        {
            title: "AI-Driven Analytics",
            description: "Predictive insights for proactive student intervention and performance reports.",
            icon: BarChart3,
            color: "text-purple-500"
        }
    ];

    return (
        <>
            <Head title="Welcome to EduManage">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-4xl">
                    <nav className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <School className="h-8 w-8 text-primary" />
                            <span className="text-xl font-bold tracking-tight">EduManage</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            {auth.user ? (
                                <Link href={dashboard()} className="rounded-full bg-primary px-6 py-2 text-black hover:bg-primary/90 transition-colors">
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link href={login()} className="text-[#1b1b18] hover:opacity-70 dark:text-[#EDEDEC]">
                                        Log in
                                    </Link>
                                    {canRegister && (
                                        <Link href={register()} className="rounded-full border border-[#19140035] px-6 py-2 hover:bg-gray-50 dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:bg-neutral-900">
                                            Register School
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="flex w-full max-w-4xl flex-col lg:flex-row items-center gap-12 py-12">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                            <ShieldCheck className="h-3 w-3" />
                            Secure & Encrypted ERP
                        </div>
                        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter lg:text-6xl">
                            Empowering the <span className="text-primary">Future</span> of Education.
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            A comprehensive digital ecosystem designed to automate operations,
                            enhance pedagogy, and foster stronger connections between teachers,
                            students, and parents.
                        </p>
                        <div className="flex gap-4">
                            <Link href={register()} className="rounded-lg bg-black px-8 py-3 font-bold text-white transition-transform hover:scale-105 dark:bg-white dark:text-black">
                                Get Started
                            </Link>
                            <button className="rounded-lg border border-gray-200 px-8 py-3 font-semibold hover:bg-gray-50 dark:border-neutral-800 dark:hover:bg-neutral-900">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 grid grid-cols-1 gap-4 w-full">
                        {features.map((feature) => (
                            <div key={feature.title} className="group relative flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50">
                                <div className={`rounded-lg p-3 bg-gray-50 dark:bg-neutral-800 ${feature.color}`}>
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <footer className="mt-12 text-center text-sm text-gray-400">
                    © 2026 EduManage SMS. All rights reserved.
                </footer>
            </div>
        </>
    );
}
