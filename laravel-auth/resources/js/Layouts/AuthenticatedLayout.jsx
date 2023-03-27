import { useState } from "react";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { Button, Typography, Card, Upload, Alert, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../scss/auth-layout.scss";

const { TextArea } = Input;
const { Text, Paragraph, Title } = Typography;

export default function Authenticated({ user, header, showDrawer, children }) {


    const sumbit = () => {

    }


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
                                    href={route("dashboard")}
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
                                    <Input />
                                </Form.Item>
                                <Form.Item label="TextArea">
                                    <TextArea rows={4} />
                                </Form.Item>
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
                                <Button type="primary" shape="round">
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
