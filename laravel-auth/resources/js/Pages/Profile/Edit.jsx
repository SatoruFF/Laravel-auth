import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { Drawer } from "antd";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [open, setOpen] = useState(false);

    const showDrawer = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        get(route('/dashboard'))
    };

    return (
        <AuthenticatedLayout
            showDrawer={showDrawer}
            user={auth.user}
            header={<h2>Profile</h2>}
        >
            <Head title="Profile" />
            <Drawer
                title="Edit profile"
                key="left"
                placement="left"
                onClose={onClose}
                open={open}
            >
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                />
                <UpdatePasswordForm />
                <DeleteUserForm />
            </Drawer>
        </AuthenticatedLayout>
    );
}
