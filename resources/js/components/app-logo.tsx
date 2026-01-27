// resources/js/components/app-logo.tsx

// Import the School icon from lucide-react
import { School } from 'lucide-react';

export default function AppLogo() {
    return (
        // Use the School icon and your system name
        <div className="flex items-center gap-3">
            {/* The icon container style matches the branding from your Welcome/Register pages */}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
                <School className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-800 dark:text-white">
                EduManage
            </span>
        </div>
    );
}

