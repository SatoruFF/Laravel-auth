import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Button, Typography, Form, Divider, Modal } from "antd";
const { Text, Paragraph, Title } = Typography;
import "../../../../scss/upd-profile.scss";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("dashboard"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className="delete-user__wrapper">
            <div className="upd-header">
                <Typography>
                    <Title level={3}>Delete Account</Title>
                    <Divider />
                    <Paragraph>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                    </Paragraph>
                </Typography>
                <DangerButton onClick={confirmUserDeletion}>
                    Delete Account
                </DangerButton>
            </div>

            <Modal
                Title="Delete modal"
                open={confirmingUserDeletion}
                onCancel={closeModal}
                className="delete-user__modal"
            >
                <Typography>
                    <Title level={2}>
                        Are you sure you want to delete your account?
                    </Title>
                    <Paragraph>
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </Paragraph>
                </Typography>

                <Form onSubmit={deleteUser} className="upd-form">
                    <Form.Item className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="form-item__label"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />
                    </Form.Item>
                    <InputError
                            message={errors.password}
                            className="inp-error"
                        />

                    <div>
                        {/* <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton> */}

                        <DangerButton disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </Form>
            </Modal>
        </section>
    );
}
