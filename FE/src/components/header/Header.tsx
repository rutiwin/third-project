import React, { useContext, useEffect, useState } from 'react';
import { logout } from '../../client/authApi';
import './Header.css';
import { UserContext } from '../AppRoutes';
import { useNavigate, Link } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);    

    const handleLogout = () => {
        logout();
        if (userContext && userContext.setUser) {
            userContext.setUser(null); // Clear the user from context
        }
        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="container">
                <div className="header-content">
                    <h1 className="header-title">Vacations Site</h1>
                    <div className="header-right">
                        <span className="greeting">
                            {userContext?.user ? `Hello ${userContext.user.firstName} ${userContext.user.lastName}` : 'Hello Guest'}
                        </span>
                        {userContext?.user && (
                            <button onClick={handleLogout} type="button" className="btn btn-primary">Logout</button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
