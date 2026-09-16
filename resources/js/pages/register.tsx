import { Head, usePage } from '@inertiajs/react';
import register from '@/wayfinder/routes/register';
import NavigationBar from '@/components/navbar';
import appStyle from '@css/app.module.css';

export default function Register() {
    const {
        props: { errors },
    } = usePage();
    const errorEntries = Object.entries(errors);

    return (
        <>
            <Head title="Register" />
            <h1>Register for aa-webapp</h1>
            <NavigationBar />

            <form {...register.store.form()}>
                <div className={appStyle.inputEntry}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div className={appStyle.inputEntry}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div className={appStyle.inputEntry}>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
                <div className={appStyle.inputEntry}>
                    <label htmlFor="password_confirmation">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                    />
                </div>
                {errorEntries.length > 0 && (
                    <fieldset className={appStyle.errors}>
                        <legend>Errors</legend>
                        <p>Could not login because:</p>
                        <ul>
                            {errorEntries.map(([key, error]) => (
                                <li key={key}>{error}</li>
                            ))}
                        </ul>
                    </fieldset>
                )}

                <button type="submit">Register</button>
            </form>
        </>
    );
}
