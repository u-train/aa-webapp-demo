import { Head, usePage } from '@inertiajs/react';
import register from '@/wayfinder/routes/register';
import NavigationBar from '@/components/navbar';

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
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                />

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

                <button type="submit">Register</button>
            </form>
        </>
    );
}
