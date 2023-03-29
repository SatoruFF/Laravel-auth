import { useEffect, useState } from "react";
import NavLink from "@/Components/NavLink";
import { Link, useForm } from "@inertiajs/react";
import {
    Button,
    Typography,
    Card,
    Upload,
    Alert,
    Form,
    Input,
    Pagination,
} from "antd";
import { PlusOutlined, FilterFilled } from "@ant-design/icons";
import InputError from "@/Components/InputError";
import "../../scss/auth-layout.scss";
import PrimaryButton from "@/Components/PrimaryButton";
import Footer from "@/Components/Footer";
import { Spin } from "antd";

const { TextArea } = Input;
const { Text, Paragraph, Title } = Typography;

export default function Authenticated({
    user,
    header,
    showDrawer,
    children,
    allUsers,
}) {
    // Custom not done
    const { data, setData, post, processing, errors } = useForm({
        client_id: user.id,
        client_name: user.name,
        client_email: user.email,
        title: "",
        message: "",
        file_link: "",
    });

    const sumbitData = (e) => {
        e.preventDefault();
        post(route("dashboard.submit"));
        alert("Сообщение отправлено!");
    };

    return (
        <div className="auth-layout-wrapper">
            <div className="auth-layout__header">
                <NavLink
                    href={route("dashboard")}
                    // active={route().current("dashboard")}
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
                        className="profile-info__card"
                    >
                        <Typography className="profile-info__text">
                            <Paragraph>
                                <Button>{user.name}</Button>
                            </Paragraph>
                            <Paragraph>{user.email}</Paragraph>
                            <Paragraph>Role: {user.role}</Paragraph>

                            <Paragraph>
                                {/* <Link
                                    //href={route("profile.edit")}
                                    href={route("dashboard")}
                                    onClick={showDrawer}
                                >
                                    Edit profile
                                </Link> */}
                                <Button
                                    type="primary"
                                    onClick={showDrawer}
                                    style={{color: "white"}}
                                >
                                    Edit profile
                                </Button>
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
                            <div className="admin-title">
                                <p>All requests</p>
                                <FilterFilled />
                            </div>
                            <div className="admin__user-list">
                                {allUsers ? (
                                    <>
                                        {allUsers.map(
                                            ({
                                                client_id,
                                                created_at,
                                                updated_at,
                                                client_name,
                                                client_email,
                                                title,
                                                message,
                                                file_link,
                                            }) => (
                                                <Card
                                                    title={title}
                                                    style={{
                                                        width: 250,
                                                        maxHeight: 300,
                                                    }}
                                                    key={Math.random()}
                                                >
                                                    <p>
                                                        user: {client_name}, id:{" "}
                                                        {client_id}, account
                                                        createAt: {created_at},
                                                        request time:{" "}
                                                        {updated_at}
                                                    </p>
                                                    <p>email: {client_email}</p>
                                                    <p>message: {message}</p>
                                                    <p>
                                                        file link: {file_link}
                                                    </p>
                                                </Card>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <Spin />
                                )}
                            </div>
                            <div className="admin-pagination">
                                <Pagination
                                    defaultCurrent={1}
                                    total={50}
                                ></Pagination>
                            </div>
                        </div>
                    ) : (
                        <div className="client-dashboard">
                            <form
                                className="upd-form"
                                layout="horizontal"
                                onSubmit={sumbitData}
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

                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    disabled={processing}
                                >
                                    submit
                                </Button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
