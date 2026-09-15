import { Head } from '@inertiajs/react';
import styles from "@css/app.module.css"
import clsx from "clsx"

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <p className={clsx(styles.somethingBig)}> Hello world! </p>
        </>
    );
}
