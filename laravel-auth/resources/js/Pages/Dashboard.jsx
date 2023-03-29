import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard({ auth }) {

    const {props} = usePage()
    const allUsers = props.users

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="">Dashboard</h2>}
            allUsers={allUsers}
        >
            <Head title="Dashboard" />

            <div></div>
        </AuthenticatedLayout>
    );
}
