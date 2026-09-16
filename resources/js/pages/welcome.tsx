import NavigationBar from '@/components/navbar';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <h1>aa-webapp</h1>
            <NavigationBar />

            <p>Welcome to the demo app! Very basic, but functional.</p>
        </>
    );
}
