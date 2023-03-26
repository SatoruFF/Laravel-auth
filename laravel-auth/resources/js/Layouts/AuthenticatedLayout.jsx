import { useState } from "react";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";
import { Button, Typography, Card, Alert } from "antd";
import "../../scss/auth-layout.scss";

const { Text, Paragraph } = Typography;

export default function Authenticated({ user, header, showDrawer, children }) {



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
                            <Paragraph> <Button>{user.name}</Button> </Paragraph>
                            <Paragraph>{user.email}</Paragraph>
                            <Paragraph>Role: {user.role}</Paragraph>
                            <Paragraph>
                                <Link
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    Dashboard
                                </Link>
                            </Paragraph>
                            



                            <Paragraph>
                                <Link href={route("profile.edit")} onClick={showDrawer}>
                                    Edit profile
                                </Link>
                            </Paragraph>

                        {children && <Alert message={children} type="success" showIcon />}
                        </Typography>
                    </Card>
                </div>
                <div className="authenticate__right-side">
                    
                </div>
            </div>
        </div>
    );
}
