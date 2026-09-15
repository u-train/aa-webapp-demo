import login from "@/routes/login";
import { Head, usePage } from "@inertiajs/react";

export default function Login() {
    const { props: { errors } } = usePage()

    const errorEntries = Object.entries(errors);
    return (
        <>
            <Head title="Login" />
            <h1>Login for aa-webapp</h1>
            <form {...login.store.form()}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                {errorEntries.length > 0 && <div>
                    <p>Could not login because:</p>
                    <ul>
                        {
                            errorEntries.map(([key, error]) => <li key={key}>{error}</li>)
                        }
                    </ul>
                </div>}
                <button type="submit">Login</button>
            </form>
        </>
    );
}
