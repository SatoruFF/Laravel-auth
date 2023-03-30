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
import Dashboard from "@/Pages/Dashboard";

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
        // file: {
        //     value: null,
        //     maxSize: 3 * 1024 * 1024,
        // },
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(2);
    const [open, setOpen] = useState(false);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const usersOnPage = allUsers.slice(startIndex, endIndex);

    const lastRequestDate = localStorage.getItem("lastRequestDate");
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

    function handlePageChanger(page) {
        setCurrentPage(page);
    }

    const showDrawer = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
        route("dashboard");
    };

    const sumbitData = (e) => {
        e.preventDefault();

        if (lastRequestDate) {
            const now = new Date();
            const lastRequest = new Date(lastRequestDate);
            if (now - lastRequest < twentyFourHours) {
                alert("Вы не можете отправлять запросы чаще, чем раз в сутки.");
                return;
            }
        }

        post(route("dashboard.submit"), {
            data: data,
            onSuccess: () => {
                alert("Успешно!");
                reset("title", "message");
                localStorage.setItem("lastRequestDate", new Date());
            },
            onError: () => {
                alert("Что-то пошло не так");
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

                            <Edit
                                mustVerifyEmail={mustVerifyEmail}
                                open={open}
                                auth={auth}
                                status={status}
                                onClose={onClose}
                            />

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
                                        {usersOnPage.map(
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
                                                    <Typography>
                                                        <Paragraph>
                                                            {client_name} id:
                                                            {client_id}
                                                        </Paragraph>
                                                        <p className="mess">
                                                            {message}
                                                        </p>
                                                        <p>
                                                            Аккаунт создан:
                                                            {created_at}
                                                        </p>
                                                        <p>
                                                            Время отправки:
                                                            {updated_at}
                                                        </p>
                                                        <p>
                                                            email:{" "}
                                                            {client_email}
                                                        </p>
                                                        <p className="card-item">
                                                            Ссылка на файл:
                                                            {file_link}
                                                        </p>
                                                    </Typography>
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
                                    current={currentPage}
                                    total={allUsers.length}
                                    pageSize={pageSize}
                                    onChange={handlePageChanger}
                                    onShowSizeChange={(current, size) => {
                                        setPageSize(size);
                                        setCurrentPage(1);
                                    }}
                                ></Pagination>
                            </div>
                        </div>
                    ) : (
                        <div className="client-dashboard">
                            <form
                                enctype="multipart/form-data"
                                className="upd-form"
                                layout="horizontal"
                                onSubmit={sumbitData}
                                htmlType="form"
                            >
                                <Title level={3}>
                                    Отправить запрос модератору:
                                </Title>
                                <Form.Item
                                    label="Заголовок"
                                    name="title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input title",
                                        },
                                        {
                                            max: 255,
                                            message: "Max length exceeded",
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

                                <Form.Item
                                    label="Сообщение:"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input title",
                                        },
                                        {
                                            max: 255,
                                            message: "Max length exceeded",
                                        },
                                    ]}
                                >
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
                                {/* <Form.Item
                                    label="Upload"
                                    valuePropName="fileList"
                                    className="client-upload"
                                >
                                    <Upload
                                        name="file"
                                        action={route(Dashboard)}
                                        listType="picture-card"
                                        onChange={(file) =>
                                            setData("file", file.fileList[0])
                                        }
                                        beforeUpload={(file) => {
                                            const isLt3M =
                                                file.size / 1024 / 1024 < 3;
                                            if (!isLt3M) {
                                                message.error(
                                                    "File must be smaller than 3MB!"
                                                );
                                                return false;
                                            }
                                            return true;
                                        }}
                                    >
                                        <PlusOutlined />
                                        <p>Upload</p>
                                    </Upload>
                                </Form.Item> */}

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
