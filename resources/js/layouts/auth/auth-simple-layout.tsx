import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import { Link } from '@inertiajs/react';
// Import the School icon to replace the Laravel icon
import { School } from 'lucide-react';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            {/* Updated Logo Container: Replaced AppLogoIcon with School icon */}
                            <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
                                <School className="size-8" />
                            </div>
                            {/* System Name Branding */}
                            <span className="text-xl font-bold tracking-tight">EduManage</span>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

