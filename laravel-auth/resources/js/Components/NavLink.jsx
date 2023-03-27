import { Link } from '@inertiajs/react';

export default function NavLink({children, ...props }) {
    return (
        <Link
            {...props}
        >
            {children}
        </Link>
    );
}
