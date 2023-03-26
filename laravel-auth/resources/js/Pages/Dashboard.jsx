import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2>Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div>You're logged in!</div>
        </AuthenticatedLayout>
    );
}
