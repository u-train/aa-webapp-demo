import passwordRoutes from '@/wayfinder/routes/password';
import styles from '@css/app.module.css';
import { Head } from '@inertiajs/react';

// Same deal as verify-email.tsx
export default function ResetPassword({
    passwordResetMessage,
}: {
    passwordResetMessage?: string;
}) {
    return (
        <>
            <Head title="Reset Password" />
            <h1>Reset Password</h1>
            {passwordResetMessage && (
                <p>
                    {passwordResetMessage} Check your email for the reset link.
                </p>
            )}

            {!passwordResetMessage &&
                <form {...passwordRoutes.email.form()}>
                    <div className={styles.inputEntry}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </div>
                    <button type="submit">Reset Password</button>
                </form>
            }
        </>
    );
}
