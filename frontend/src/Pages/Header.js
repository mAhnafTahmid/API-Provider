import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'

function Header() {
    const [isUserSignedIn, setIsUserSignedIn] = useState(!!localStorage.getItem('jwt'));
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('email');
        setIsUserSignedIn(false);
        navigate('/login');
    };

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'jwt') {
                setIsUserSignedIn(!!event.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300'>
            <Link to='/profile'>
                <h1 className='text-3xl'>API Provider</h1>
            </Link>
            <ul className='flex gap-6'>
                <Link to='/user' target="_blank">
                    <li>Use Api</li>
                </Link>
                {isUserSignedIn ? (
                    <>
                        <li>
                            <button onClick={handleSignOut}>Sign Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <Link to='/login'>
                            <li>Login</li>
                        </Link>
                        <Link to='/'>
                            <li>Signup</li>
                        </Link>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Header;