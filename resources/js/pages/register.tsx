import { Head, Link, usePage } from '@inertiajs/react';
import register from '@/wayfinder/routes/register';

export default function Register() {
    const { props: { errors } } = usePage()
    const errorEntries = Object.entries(errors)

    return (
        <>
            <Head title="Register" />
            <h1>Register for aa-webapp</h1>
            {/* <nav>
                <ul>
                    {!isAuthenticated && <li><Link href={routes.login()}>Login</Link></li>}
                    {!isAuthenticated && <li><Link href={routes.register()}>Register</Link></li>}
                    {isAuthenticated && <li><Link href={routes.logout()}>Logout</Link></li>}
                    {isAuthenticated && currentUser && <li><Link href={userRoutes.show(currentUser.email)}>View Profile</Link></li>}
                    {isAdmin && <li><Link href={userRoutes.index()}>View all Profiles</Link></li>}
                </ul>
            </nav> */}

            <form {...register.store.form()}>
                <input type="text" name="name" id="name" />
                <input type="email" name="email" id="email" />
                <input type="password" name="password" id="password" />
                <input type="password" name="password_confirmation" id="password_confirmation" />

                {errorEntries.length > 0 && <div>
                    <p>Could not login because:</p>
                    <ul>
                        {
                            errorEntries.map(([key, error]) => <li key={key}>{error}</li>)
                        }
                    </ul>
                </div>}

                <button type="submit">Register</button>
            </form>
        </>
    );
}
