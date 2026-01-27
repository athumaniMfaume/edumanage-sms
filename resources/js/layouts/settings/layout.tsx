import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import type { NavItem } from '@/types';
import { Link } from '@inertiajs/react';
// Added icons for a more professional 2026 UI
import { User, Lock, ShieldCheck, Palette, School } from 'lucide-react';
import type { PropsWithChildren } from 'react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'School Profile',
        href: '/settings/school', // You will need to define this route
        icon: School,
    },
    {
        title: 'Profile',
        href: edit(),
        icon: User,
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: Lock,
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: Palette,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentUrl } = useCurrentUrl();

    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="px-4 py-6">
            <Heading
                title="Account & Institutional Settings"
                description="Manage your personal profile and school configuration"
            />

            <div className="mt-8 flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-56">
                    <nav
                        className="flex flex-col space-y-1"
                        aria-label="Settings Navigation"
                    >
                        {sidebarNavItems.map((item, index) => (
                            <Button
                                key={`${toUrl(item.href)}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn(
                                    'w-full justify-start gap-3 px-4 py-2 text-sm font-medium transition-colors',
                                    isCurrentUrl(item.href)
                                        ? 'bg-primary/10 text-primary hover:bg-primary/20'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                )}
                            >
                                <Link href={item.href}>
                                    {item.icon && (
                                        <item.icon className="h-4 w-4 shrink-0" />
                                    )}
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 lg:hidden" />

                <div className="flex-1">
                    <section className="max-w-3xl space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
