import { Head, Link, usePage } from '@inertiajs/react';
import userRoutes from "@/wayfinder/routes/users"
import { Inertia } from '@/wayfinder/types';

export default function Profiles() {
    const { props: { users, previousPage, nextPage, currentPage, lastPage } } = usePage<Inertia.Pages.Profiles>()
    return (
        <>
            <Head title="Profiles" />
            <h1>Profiles</h1>
            <nav>
                <ul>
                    <li><Link href="/users">See All Users</Link></li>
                    <li><Link method='post' href="/logout">Logout</Link></li>
                </ul>
            </nav>
            <table>
                <caption>All Users</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Is Verified?</th>
                        <th>Last Changed</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(({ name, email, email_verified_at, updated_at, created_at }) => {
                            const lastModified = updated_at ?? created_at
                            const lastModifiedRemark = lastModified ? Temporal.Instant.from(lastModified).toLocaleString() : "Unknown"
                            const isVerified = email_verified_at !== null;
                            return (
                                <tr>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{isVerified ? "Yes" : "No"}</td>
                                    <td>{lastModifiedRemark}</td>
                                    <td><Link href={userRoutes.show(email)}>View</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <footer>
                {<Link href={userRoutes.index()}>{"<<"}</Link>}
                {previousPage && <Link href={previousPage}>{"<"}</Link>}
                <span>Page {currentPage}</span>
                {nextPage && <Link href={nextPage}>{">"}</Link>}
                {<Link href={userRoutes.index({ "query": { "page": lastPage.toString() } })}>{">>"}</Link>}
            </footer>
        </>
    );
}
