import { Inertia } from '@/wayfinder/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Profile() {
    const { props: { isAdmin, target_user: targetUser, currentUser } } = usePage<Inertia.Pages.Profile>()
    const isCurrentUserProfile = targetUser.email === currentUser.email
    return (
        <>
            <Head title="Profile" />
            <h1>{targetUser.name}'s Profile</h1>
            <nav>
                <ul>
                    {isAdmin && <li><Link href="/users">See All Users</Link></li>}
                    {isCurrentUserProfile && <li><Link href="/users/">Edit page</Link></li>}
                    <li><Link method='post' href="/logout">Logout</Link></li>
                </ul>
            </nav>

            <p>Their email is {targetUser.email}.{" "}
                {targetUser.updated_at !== null && <>The last time the profile changed was {Temporal.Instant.from(targetUser.updated_at).toLocaleString()}.</>}
                {targetUser.updated_at === null && <>It is unknown when the profile last changed.</>}
            </p>
        </>
    )
}
