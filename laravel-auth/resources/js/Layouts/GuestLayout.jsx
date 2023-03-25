import { Link } from '@inertiajs/react';
import '../../scss/guest.scss';

export default function Guest({ children }) {
    return (
        <div className='guest-wrapper'>
            <div  className='guest-home'>
                <Link href="/">
                    <p>HOME</p>
                </Link>
            </div>

            <div>
                {children}
            </div>
        </div>
    );
}
