import { usePage } from '@inertiajs/react';

export function useCurrentUserInfo() {
    const page = usePage();

    return {
        user: page.props.currentUser ?? null,
        isAdmin: page.props.isAdmin ?? false,
        isUser: page.props.isUser ?? false,
    };
}
