import NavigationBar from '@/components/navbar';
import { NavUrlEntry } from '@/components/navbar-url-entry';
import { useAuthUser } from '@/hooks/useAuthUser';
import userRoutes from '@/wayfinder/routes/users';
import { Inertia } from '@/wayfinder/types';
import { Head, usePage } from '@inertiajs/react';

export default function Profile() {
    const {
        props: { target_user: targetUser },
    } = usePage<Inertia.Pages.Profile>();
    const currentUser = useAuthUser();
    const isCurrentUserProfile = targetUser.email === currentUser.email;
    const editProfileUrl = userRoutes.edit(targetUser.email).url;

    return (
        <>
            <Head title="Profile" />
            <h1>{targetUser.name}'s Profile</h1>
            <NavigationBar>
                <NavUrlEntry
                    show={isCurrentUserProfile}
                    entry="Edit Profile"
                    url={editProfileUrl}
                />
            </NavigationBar>
            <p>
                Their email is {targetUser.email}.{' '}
                {targetUser.updated_at !== null && (
                    <>
                        The last time the profile changed was{' '}
                        {Temporal.Instant.from(
                            targetUser.updated_at,
                        ).toLocaleString()}
                        .
                    </>
                )}
                {targetUser.updated_at === null && (
                    <>It is unknown when the profile last changed.</>
                )}
            </p>
        </>
    );
}
