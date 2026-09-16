import routes from '@/wayfinder/routes';
import userRoutes from '@/wayfinder/routes/users';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const {
        props: { isAuthenticated, isAdmin, currentUser },
    } = usePage();

    return (
        <>
            <Head title="Welcome" />
            <h1>aa-webapp</h1>
            <nav>
                <ul>
                    {!isAuthenticated && (
                        <li>
                            <Link href={routes.login()}>Login</Link>
                        </li>
                    )}
                    {!isAuthenticated && (
                        <li>
                            <Link href={routes.register()}>Register</Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <Link href={routes.logout()}>Logout</Link>
                        </li>
                    )}
                    {isAuthenticated && currentUser && (
                        <li>
                            <Link href={userRoutes.show(currentUser.email)}>
                                View Profile
                            </Link>
                        </li>
                    )}
                    {isAdmin && (
                        <li>
                            <Link href={userRoutes.index()}>
                                View all Profiles
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
            <p>Welcome to the demo app! Very basic, but functional.</p>
        </>
    );
}
