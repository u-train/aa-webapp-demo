import { usePage } from "@inertiajs/react";

export function useAuthUser() {
    const { props: { auth: { user } } } = usePage();

    if (user === null) {
        throw new Error("Expected to have an authenticated user");
    }

    return user;
}