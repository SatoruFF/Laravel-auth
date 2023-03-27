import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { Button, Typography, Form, Divider } from "antd";
const { Text, Paragraph, Title } = Typography;
import "../../../../scss/upd-profile.scss";

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.edit"));
    };

    return (
        <div className="update-profile-info__wrapper">
            <div className="upd-header">
                <Typography>
                    <Title>Profile Information</Title>
                    <Divider />
                    <Paragraph>
                        Update your account's profile information and email
                        address.
                    </Paragraph>
                </Typography>
            </div>

            <section>
                <Form onSubmit={submit} className="upd-form">
                    <Form.Item className="upd-form__item">
                        <InputLabel
                            htmlFor="name"
                            value="Name"
                            className="form-item__label"
                        />

                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                    </Form.Item>
                    <InputError className="inp-error" message={errors.name} />

                    <Form.Item className="upd-form__item">
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="form-item__label"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </Form.Item>
                    <InputError className="inp-error" message={errors.email} />

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p>
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div>
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <PrimaryButton type="submit" disabled={processing}>
                            Save
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enterFrom="opacity-0"
                            leaveTo="opacity-0"
                        >
                            <p>Saved.</p>
                        </Transition>
                    </div>
                </Form>
            </section>
        </div>
    );
}
