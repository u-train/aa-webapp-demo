import { Inertia } from '@/wayfinder/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Profile() {
    const { props: { isAdmin, isCurrentPage, target_user: user } } = usePage<Inertia.Pages.Profile>()

    return (
        <>
            <Head title="Profile" />
            <h1>{user.name}'s Profile</h1>
            <nav>
                <ul>
                    {/* Without === true, it insists that the type is incorrect here.*/}
                    {isAdmin === true && <li><Link href="/users">See All Users</Link></li>}
                    {(isCurrentPage === true || isAdmin) && <li><Link href="/users/">Edit page</Link></li>}
                    <li><Link method='post' href="/logout">Logout</Link></li>
                </ul>
            </nav>

            <p>Their email is {user.email}.{" "}
                {user.updated_at !== null && <>The last time the profile changed was {Temporal.Instant.from(user.updated_at).toLocaleString()}.</>}
                {user.updated_at === null && <>It is unknown when the profile last changed.</>}
            </p>
        </>
    )
}
