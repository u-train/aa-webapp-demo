import { createInertiaApp } from '@inertiajs/react';
import '@css/app.module.css';
import Layout from './layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (_name, _page) => Layout,
    progress: {
        color: '#4B5563',
    },
});
