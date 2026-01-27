import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';
import { School, User, Mail } from 'lucide-react';

export default function Register() {
    return (
        <AuthLayout
            title="School Registration"
            description="Join the EduManage ecosystem and start managing your school digitally."
        >
            <Head title="Register School" />

            {/*
                BRANDING REMOVED FROM HERE
                It is now handled globally in AuthSimpleLayout.tsx
            */}

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            {/* School Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="school_name" className="flex items-center gap-2">
                                    <School className="h-4 w-4 text-muted-foreground" />
                                    School Name
                                </Label>
                                <Input
                                    id="school_name"
                                    name="school_name"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="e.g. Westside Academy"
                                />
                                <InputError message={errors.school_name} />
                            </div>

                            {/* Admin Name */}
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    Administrator Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    tabIndex={2}
                                    placeholder="Principal or Admin full name"
                                />
                                <InputError message={errors.name} />
                            </div>

                            {/* Email */}
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    Work Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    placeholder="email@school.edu"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Passwords */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        placeholder="••••••••"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm</Label>
                                    <Input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={5}
                                        placeholder="••••••••"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full py-6 text-base font-bold shadow-md transition-all hover:scale-[1.01]"
                                tabIndex={6}
                            >
                                {processing && <Spinner className="mr-2 h-4 w-4" />}
                                Register My School
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink href={login()} tabIndex={7} className="font-semibold text-primary">
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
