import passwordRoutes from '@/wayfinder/routes/password';
import { Head, usePage } from '@inertiajs/react';
import appStyle from '@css/app.module.css';

// Same deal as verify-email.tsx
export default function ResetingPassword({
    email,
    token,
}: {
    email: string;
    token: string;
}) {
    console.log(usePage());
    return (
        <>
            <Head title="Reseting Password" />
            <h1>Reseting Password</h1>
            <form {...passwordRoutes.update.form.post()}>
                <div className={appStyle.inputEntry}>
                    <label htmlFor="email">Resetting for</label>
                    <input
                        readOnly
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                    />
                </div>
                <div className={appStyle.inputEntry}>
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className={appStyle.inputEntry}>
                    <label htmlFor="password_confirmation">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                    />
                </div>
                <input type="hidden" name="token" value={token} />
                <button type="submit">Reset Password</button>
            </form>
        </>
    );
}
