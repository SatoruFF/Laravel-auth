import { Link, Head } from '@inertiajs/react';
import { Button } from 'antd';
import '../../scss/welcome.scss'
import 'animate.css';
import { useEffect } from 'react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <div className='welcome-wrapper'>
            <Head title="Welcome" />
            <div className='welcome-header'>
                {auth.user ? (
                    <Button type='primary' shape='round'>
                        <Link
                            href={route('dashboard')}
                            className="header__item"
                        >
                            Dashboard
                        </Link>
                    </Button>
                ) : (
                    <div className='header__items'>
                    <Button type="primary" shape='round'>
                        <Link
                                href={route('login')}
                                className="header__item"
                            >
                                Log in
                        </Link>
                    </Button>

                    <Button shape='round' type='primary'>
                        <Link
                                href={route('register')}
                                className="header__item"
                            >
                                Register
                        </Link>
                    </Button>
                    </div>
                )}
                </div>
            <div/>
            <div className="welcome-content">
                <div className="welcome__main-block animate__animated animate__fadeInDown">
                    <h1 className="content__item">This is a test task</h1>
                    <p className="content__item content-highlight">Made by: SatoruF</p>
                    <p className="content__item content-highlight">for: Good technologies</p>
                    <div className="versions">
                        Laravel v{laravelVersion} (PHP v{phpVersion})
                    </div> 
                </div>
            </div>
        </div>
    );
}


