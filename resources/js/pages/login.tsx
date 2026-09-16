import login from '@/wayfinder/routes/login';
import password from '@/wayfinder/routes/password';
import { Head, Link } from '@inertiajs/react';

// Same as verify-email.tsx.
export default function Login({
    errors,
    successfulResetPasswordMessage,
}: {
    errors: Record<string, string>;
    successfulResetPasswordMessage?: string;
}) {
    const errorEntries = Object.entries(errors);

    return (
        <>
            <Head title="Login" />
            <h1>Login for aa-webapp</h1>
            <nav>
                <ul>
                    <Link href="/">Welcome Page</Link>
                </ul>
            </nav>
            {successfulResetPasswordMessage && (
                <p>{successfulResetPasswordMessage}</p>
            )}
            <form {...login.store.form()}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                {errorEntries.length > 0 && (
                    <div>
                        <p>Could not login because:</p>
                        <ul>
                            {errorEntries.map(([key, error]) => (
                                <li key={key}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Link href={password.request()}>Forgot Password?</Link>
                <button type="submit">Login</button>
            </form>
        </>
    );
}
