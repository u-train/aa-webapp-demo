import { usePage } from "@inertiajs/react";

export function useAuthUser() {
    const { props: { currentUser } } = usePage();

    if (currentUser  === null) {
        throw new Error("Expected to have an authenticated user");
    }

    return currentUser ;
}