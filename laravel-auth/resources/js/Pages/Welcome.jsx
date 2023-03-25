import { Link, Head } from '@inertiajs/react';
import '../../scss/welcome.scss'

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className='back'>
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                        >
                            Log in
                        </Link>

                        <Link
                            href={route('register')}
                        >
                            Register
                        </Link>
                    </>
                )}
                </div>
            <div/>
        </>
    );
}


{/* <div className="ml-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-right sm:ml-0">
                Laravel v{laravelVersion} (PHP v{phpVersion})
            </div> */}