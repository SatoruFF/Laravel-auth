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
        alert("delete");

        destroy(route("profile.destroy"), {
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
                    <Title level={3}>Удалить аккаунт</Title>
                    <Divider />
                    <Paragraph>
                        Как только ваша учетная запись будет удалена, все ее
                        ресурсы и данные будут удалены безвозвратно. Перед
                        удалением вашего учетная запись, пожалуйста, загрузите
                        любые данные или информацию, которые вы хотите
                        сохранить.
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
                        Вы уверены, что хотите удалить свою учетную запись?
                    </Title>
                    <Paragraph>
                        Как только ваша учетная запись будет удалена, все ее
                        ресурсы и данные будут удалены безвозвратно. Пожалуйста,
                        введите свой пароль для подтверждения, который вы хотели
                        бы удалить безвозвратно ваша учетная запись.
                    </Paragraph>
                </Typography>

                <form onSubmit={deleteUser} className="upd-form">
                    <Form.Item className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Пароль:"
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
                        <DangerButton htmlType="submit" disabled={processing}>
                            Удалить
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
