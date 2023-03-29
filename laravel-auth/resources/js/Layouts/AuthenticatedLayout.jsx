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
    Divider,
} from "antd";
import { PlusOutlined, FilterFilled } from "@ant-design/icons";
import InputError from "@/Components/InputError";
import "../../scss/auth-layout.scss";
import PrimaryButton from "@/Components/PrimaryButton";
import Footer from "@/Components/Footer";
import { Spin } from "antd";
import Edit from "@/Pages/Profile/Edit";

const { TextArea } = Input;
const { Text, Paragraph, Title } = Typography;

export default function Authenticated({
    user,
    header,
    children,
    allUsers,
    mustVerifyEmail,
    status,
    auth,
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        client_id: user.id,
        client_name: user.name,
        client_email: user.email,
        title: "",
        message: "",
        file_link: "",
    });

    const [open, setOpen] = useState(false);

    const showDrawer = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        route('dashboard');
    };

    const sumbitData = (e) => {
        e.preventDefault();
        post(route("dashboard.submit"), {
            onSuccess: () => {
                alert('Успешно!');
                reset('title', 'message');
            },
            onError: () => {
                alert("Что-то пошло не так")
            },
        });
        
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

            {header && <div className="auth-layout__title">Дашборд</div>}

            <div className="authenticate__main-content">
                <div className="authenticate__left-side">
                    <Card
                        title="Информация о пользователе"
                        extra={<a href={route("logout")}>Выход</a>}
                        className="profile-info__card"
                    >
                        <Typography className="profile-info__text">
                            <Paragraph>
                                <Button>{user.name}</Button>
                            </Paragraph>
                            <Paragraph>{user.email}</Paragraph>
                            <Paragraph>Роль: {user.role}</Paragraph>

                            <Paragraph>
                                <Button
                                    type="primary"
                                    onClick={showDrawer}
                                    style={{ color: "white" }}
                                >
                                    Редактировать профиль
                                </Button>
                            </Paragraph>


                            <Edit mustVerifyEmail={mustVerifyEmail} open={open} auth={auth} status={status} onClose={onClose}/>


                            <Alert
                                message="Вы успешно вошли!"
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
                                <p>Все запросы:</p>
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
                                                    title={"Тема:" + title}
                                                    className="main-user-card"
                                                    key={Math.random()}
                                                >
                                                    <p className="name">
                                                        {client_name} id:
                                                        {client_id}
                                                    </p>
                                                    <p className="mess">
                                                        сообщение: {message}
                                                    </p>
                                                    <p>
                                                        <p>
                                                            Аккаунт создан:{" "}
                                                            {created_at}
                                                        </p>
                                                        <p>
                                                            Время отправки:{" "}
                                                            {updated_at}
                                                        </p>
                                                        <p>
                                                            email:{" "}
                                                            {client_email}
                                                        </p>
                                                        <p>
                                                            Ссылка на файл:{" "}
                                                            {file_link}
                                                        </p>
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
                                <Title level={3}>Отправить запрос модератору:</Title>
                                <Form.Item
                                    label="Заголовок"
                                    name="title"
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
                                        name="title"
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

                                <Form.Item label="Сообщение:">
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
