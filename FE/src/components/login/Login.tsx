import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { login } from '../../client/authApi';
import { UserContext } from '../AppRoutes';
import { validateEmailAndPassword } from '../../helpers';
import { toast } from 'react-toastify';

type Props = {};

const Login = (props: Props) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext) || { setUser: () => {} };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        validateEmailAndPassword(email, password);
        try {
            const user = await login(email, password);            
            setUser(user);
            navigate('/');  // Redirect to main page after login
        } catch (error: any) {
            if ((error.response.data.message) !== 'Email must be valid.' && (error.response.data.message) !== 'Password must be at least 4 characters.') {
                toast.error('Registration failed: ' + error.response.data.message);
            }
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="text-center">Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="switch-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;