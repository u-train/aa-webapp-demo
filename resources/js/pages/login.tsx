import login from '@/wayfinder/routes/login';
import password from '@/wayfinder/routes/password';
import { Head, Link } from '@inertiajs/react';
import styles from '@css/app.module.css';
import NavigationBar from '@/components/navbar';

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
            <NavigationBar />
            {successfulResetPasswordMessage && (
                <p>{successfulResetPasswordMessage}</p>
            )}
            <form {...login.store.form()}>
                <div className={styles.inputEntry}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className={styles.inputEntry}>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" />
                </div>
                {errorEntries.length > 0 && (
                    <fieldset className={styles.errors}>
                        <legend>Errors</legend>
                        <p>Could not login because:</p>
                        <ul>
                            {errorEntries.map(([key, error]) => (
                                <li key={key}>{error}</li>
                            ))}
                        </ul>
                    </fieldset>
                )}
                <Link href={password.request()}>Forgot Password?</Link>
                <button type="submit">Login</button>
            </form>
        </>
    );
}
