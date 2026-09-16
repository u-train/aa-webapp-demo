import userRoutes from "@/wayfinder/routes/users";
import { Inertia } from "@/wayfinder/types";
import { Head, Link, usePage } from "@inertiajs/react";


export default function EditProfile({ targetUser }: Inertia.Pages.EditProfile) {
    const { props: { errors } } = usePage()
    const errorEntries = Object.entries(errors)

    return <>
        <Head title="Editing Profile" />
        <h1>Editing your profile</h1>
        <nav>
            <Link href={userRoutes.show(targetUser.email)}>Back to Profile</Link>
        </nav>
        <form {...userRoutes.update.form(targetUser.email)}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" defaultValue={targetUser.name} />
            <label htmlFor="name">Email</label>
            <input type="email" name="email" id="email" defaultValue={targetUser.email} />
            <fieldset>
                <legend>Changing Password</legend>
                <label htmlFor="current_password">Current password</label>
                <input type="password" name="current_password" id="current_password" />
                <label htmlFor="new_password">New password</label>
                <input type="password" name="new_password" id="new_password" />
                <label htmlFor="new_password_confirmation">Confirm new password</label>
                <input type="password" name="new_password_confirmation" id="new_password_confirmation" />
            </fieldset>

            <button type="submit">Submit</button>
            {errorEntries.length > 0 && <div>
                <p>Could not login because:</p>
                <ul>
                    {
                        errorEntries.map(([key, error]) => <li key={key}>{error}</li>)
                    }
                </ul>
            </div>}
        </form>
    </>
}