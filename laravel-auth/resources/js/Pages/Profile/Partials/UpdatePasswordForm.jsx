import { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Button, Typography, Form, Divider } from "antd";
const { Text, Paragraph, Title } = Typography;
import "../../../../scss/upd-profile.scss";

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();
        alert("upd pass");

        put(route("profile.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className="update-password__wrapper">
            <div className="upd-header">
                <Typography>
                    <Title level={3}>Обновить пароль</Title>
                    <Divider />
                    <Paragraph>
                        Убедитесь, что в вашей учетной записи используется
                        длинный случайный пароль, чтобы оставаться в
                        безопасности.
                    </Paragraph>
                </Typography>
            </div>

            <form onSubmit={updatePassword} className="upd-form">
                <Form.Item className="upd-form__item">
                    <InputLabel
                        htmlFor="current_password"
                        value="Текущий пароль:"
                        className="form-item__label"
                    />

                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />
                </Form.Item>
                <InputError
                    message={errors.current_password}
                    className="inp-error"
                />

                <Form.Item className="upd-form__item">
                    <InputLabel
                        htmlFor="password"
                        value="Новый пароль:"
                        className="form-item__label"
                    />

                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                </Form.Item>
                <InputError message={errors.password} className="inp-error" />

                <Form.Item className="upd-form__item">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Подтверждение"
                        className="form-item__label"
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />
                </Form.Item>
                <InputError
                    message={errors.password_confirmation}
                    className="inp-error"
                />

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Сохранить</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="saved-notifiaction">Сохранено.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
