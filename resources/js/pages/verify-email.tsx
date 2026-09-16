import EmailVerificationNotificationController from "@/wayfinder/Laravel/Fortify/Http/Controllers/EmailVerificationNotificationController"
import { Head } from "@inertiajs/react"

// TODO: It seems that Wayfinder cannot see other places where render was called (only in controllers?).
// So, we'll write it inline here. The fix would be disabling fortify views and then rewiring all the routes accordingly.
export default function VerifyEmail({ wasAccountMadeRecently }: { wasAccountMadeRecently: boolean }) {
    return <>
        <Head title="Email Verification" />
        <h1>Email Verification</h1>

        {
            wasAccountMadeRecently ?
                <p>We have sent you an email with a link to verify your account. Please click it to continue to your account.</p>
                : <p>Your email account has not been verified yet. Please check your email for the verification link.</p>
        }

        <p>If you have not received the email or have lost it, click below to resend.</p>
        <form {...EmailVerificationNotificationController.store.form()}>
            <button type="submit">Resend email</button>
        </form>
    </>
}