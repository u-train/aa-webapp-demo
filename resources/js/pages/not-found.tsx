import NavigationBar from '@/components/navbar';
import { Head } from '@inertiajs/react';

export default function NotFoundPage() {
    return (
        <>
            <Head title="404 Page" />
            <h1>Error 404</h1>
            <NavigationBar />
            <p>Sorry, this page could not be found.</p>
        </>
    );
}
