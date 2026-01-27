import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    LayoutGrid,
    GraduationCap,
    Users,
    Book,
    ListChecks,
    Settings,
    BarChart3,
    CalendarDays,
    ClipboardCheck
} from 'lucide-react';
import AppLogo from './app-logo';

// Main Academic Management items
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Teachers',
        href: '/teachers',
        icon: GraduationCap,
    },
    {
        title: 'Students',
        href: '/students',
        icon: Users,
    },
    {
        title: 'Courses',
        href: '/courses',
        icon: Book,
    },
    {
        title: 'Enrollments',
        href: '/enrollments',
        icon: ListChecks,
    },
    {
        title: 'Attendance',
        href: '/attendance',
        icon: ClipboardCheck,
    },
];

// System and Support items (Replaces the Laravel/Github links)
const footerNavItems: NavItem[] = [
    {
        title: 'Academic Year',
        href: '/settings/academic-year',
        icon: CalendarDays,
    },
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart3,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Academic Management Section */}
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* Administrative Section */}
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
