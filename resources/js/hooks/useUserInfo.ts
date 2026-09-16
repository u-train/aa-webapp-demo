import { usePage } from '@inertiajs/react';

export function useCurrentUserInfo() {
    const page = usePage();

    return {
        user: page.props.currentUser,
        isAdmin: page.props.isAdmin,
        isUser: page.props.isUser,
    };
}
