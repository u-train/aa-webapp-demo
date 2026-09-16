import { useCurrentUserInfo } from '@/hooks/useUserInfo';
import routes from '@/wayfinder/routes';
import { ReactNode } from 'react';
import userRoutes from '@/wayfinder/routes/users';
import { NavUrlEntry } from './navbar-url-entry';

export default function NavigationBar({ children }: { children?: ReactNode }) {
    const { user, isAdmin } = useCurrentUserInfo();

    return (
        <nav>
            <ul>
                <NavUrlEntry entry="Landing" url={routes.home().url} />
                <NavUrlEntry
                    show={!user}
                    entry="Login"
                    url={routes.login().url}
                />
                <NavUrlEntry
                    show={!user}
                    entry="Register"
                    url={routes.register().url}
                />
                <NavUrlEntry
                    show={!!user}
                    entry="Logout"
                    url={routes.logout().url}
                />
                <NavUrlEntry
                    show={!!user}
                    entry="View My Profile"
                    url={userRoutes.show(user?.email ?? '').url}
                />
                <NavUrlEntry
                    show={isAdmin}
                    entry="View all Profiles"
                    url={userRoutes.index().url}
                />
                {children}
            </ul>
        </nav>
    );
}
