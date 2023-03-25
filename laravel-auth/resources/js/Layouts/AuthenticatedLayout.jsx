import { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import '../../scss/auth-layout.scss'

export default function Authenticated({ user, header, children }) {
    const [admin, setAdmin] = useState(false);

    return (
        <div className="kek">
            <div>
                <NavLink
                    href={route("dashboard")}
                    active={route().current("dashboard")}
                >
                    Dashboard
                </NavLink>
            </div>

            <div>{user.name}</div>

            <Dropdown>
                <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>
                        Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                    >
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>

            <ResponsiveNavLink
                href={route("dashboard")}
                active={route().current("dashboard")}
            >
                Dashboard
            </ResponsiveNavLink>

            <div className="px-4">
                <div className="font-medium text-base text-gray-800">
                    {user.name}
                </div>
                <div className="font-medium text-sm text-gray-500">
                    {user.email}
                </div>
            </div>

            <div className="mt-3 space-y-1">
                <ResponsiveNavLink href={route("profile.edit")}>
                    Profile
                </ResponsiveNavLink>
                <ResponsiveNavLink
                    method="post"
                    href={route("logout")}
                    as="button"
                >
                    Log Out
                </ResponsiveNavLink>
            </div>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
