import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import { Drawer } from "antd";

export default function Edit({ auth, onClose, open, mustVerifyEmail, status }) {
    return (
            <Drawer
                title="Редактировать профиль"
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
    );
}
