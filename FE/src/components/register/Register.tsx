import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';
import { register } from '../../client/authApi';
import { UserContext } from '../AppRoutes';
import { validateEmailAndPassword } from '../../helpers';
import { toast } from 'react-toastify';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

type Props = {};

const Register = (props: Props) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext) || { setUser: () => { } };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        validateEmailAndPassword(formData.email, formData.password);
        try {
            const user = await register(formData.firstName, formData.lastName, formData.email, formData.password);
            setUser(user);
            toast.success("Registration done successfully!");
            navigate('/');  // Redirect to main page after registration
        } catch (error: any) {
            if ((error.response.data.message) !== 'Email must be valid.' && (error.response.data.message) !== 'Password must be at least 4 characters.') {
                toast.error('Registration failed: ' + error.response.data.message);
            }
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2 className="text-center">Register</h2>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="First Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Last Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
                <p className="switch-link">
                    Already a member? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;