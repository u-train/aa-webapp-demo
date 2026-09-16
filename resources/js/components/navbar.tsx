import { useCurrentUserInfo } from '@/hooks/useUserInfo';
import routes from '@/wayfinder/routes';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';
import userRoutes from '@/wayfinder/routes/users';

export default function NavigationBar({ children }: { children?: ReactNode }) {
    const { user, isAdmin } = useCurrentUserInfo();

    return (
        <nav>
            <ul>
                <li>
                    <Link href={routes.home()}>Landing</Link>
                </li>
                {!user && (
                    <li>
                        <Link href={routes.login()}>Login</Link>
                    </li>
                )}
                {!user && (
                    <li>
                        <Link href={routes.register()}>Register</Link>
                    </li>
                )}
                {user && (
                    <li>
                        <Link href={routes.logout()}>Logout</Link>
                    </li>
                )}
                {user && (
                    <li>
                        <Link href={userRoutes.show(user.email)}>
                            View My Profile
                        </Link>
                    </li>
                )}
                {isAdmin && (
                    <li>
                        <Link href={userRoutes.index()}>View all Profiles</Link>
                    </li>
                )}
                {children}
            </ul>
        </nav>
    );
}
