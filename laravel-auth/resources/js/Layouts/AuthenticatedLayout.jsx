import { useState } from "react";
import NavLink from "@/Components/NavLink";
import { Link, useForm } from "@inertiajs/react";
import { Button, Typography, Card, Upload, Alert, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import InputError from '@/Components/InputError';
import "../../scss/auth-layout.scss";
import PrimaryButton from "@/Components/PrimaryButton";

const { TextArea } = Input;
const { Text, Paragraph, Title } = Typography;

export default function Authenticated({ user, header, showDrawer, children }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: user.id,
        client_name: user.name,
        client_email: user.email,
        title: "",
        message: "",
        file_link: "",
    });

    const sumbit = (e) => {
        alert('kek')
        e.preventDefault();
        post(route('dashboard.submit'), data);
    };

    return (
        <div className="auth-layout-wrapper">
            <div className="auth-layout__header">
                <NavLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    <Button type="primary" shape="round">
                        Dashboard
                    </Button>
                </NavLink>
            </div>

            {header && <div className="auth-layout__title">Dashboard</div>}

            <div className="authenticate__main-content">
                <div className="authenticate__left-side">
                    <Card
                        title="User info"
                        extra={<a href={route("logout")}>Log out</a>}
                        style={{ width: 300 }}
                    >
                        <Typography>
                            <Paragraph>
                                <Button>{user.name}</Button>
                            </Paragraph>
                            <Paragraph>{user.email}</Paragraph>
                            <Paragraph>Role: {user.role}</Paragraph>

                            <Paragraph>
                                <Link
                                    href={route("profile.edit")}
                                    onClick={showDrawer}
                                >
                                    Edit profile
                                </Link>
                            </Paragraph>

                            <Alert
                                message="You're logged in!"
                                type="success"
                                showIcon
                            />
                            {children}
                        </Typography>
                    </Card>
                </div>
                <div className="authenticate__right-side">
                    {user.role == "ADMIN" ? (
                        <div className="admin-dashboard">
                            <div className="admin-title">All requests</div>
                        </div>
                    ) : (
                        <div className="client-dashboard">


                            <Form
                                className="upd-form"
                                layout="horizontal"
                                onSubmit={sumbit}
                                htmlType="form"
                            >
                                <Title level={3}>Send your data to admin</Title>
                                <Form.Item
                                    label="Title"
                                    name="Title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input title",
                                        },
                                    ]}
                                >
                                    <Input
                                        id="title"
                                        type="text"
                                        name="titlt"
                                        value={data.title}
                                        autoComplete="title"
                                        onChange={(e) =>
                                            setData("title", e.target.value)
                                        }
                                    />
                                </Form.Item>
                                <InputError
                                    message={errors.title}
                                    className="inp-error"
                                />

                                <Form.Item label="TextArea">
                                    <TextArea
                                        rows={4}
                                        id="message"
                                        type="text"
                                        name="message"
                                        value={data.message}
                                        autoComplete="message"
                                        onChange={(e) =>
                                            setData("message", e.target.value)
                                        }
                                    />
                                </Form.Item>
                                <InputError
                                    message={errors.message}
                                    className="inp-error"
                                />
                                <Form.Item
                                    label="Upload"
                                    valuePropName="fileList"
                                    className="client-upload"
                                >
                                    <Upload
                                        action="/upload.do"
                                        listType="picture-card"
                                    >
                                        <PlusOutlined />
                                        <p>Upload</p>
                                    </Upload>
                                </Form.Item>

                                <Button htmlType="submit" disabled={processing} type="primary">
                                    submit
                                </Button>

                            </Form>



                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
