import { Link } from '@inertiajs/react';

export function NavUrlEntry({
    show,
    entry,
    url,
}: {
    show?: boolean;
    entry: string;
    url: string;
}) {
    if (show || show === undefined) {
        return (
            <li>
                <Link href={url}>{entry}</Link>
            </li>
        );
    } else {
        return null;
    }
}
