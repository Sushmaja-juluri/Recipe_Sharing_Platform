import './Login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) navigate('/');
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // 🔐 Mock authentication (remove this when backend is ready)
        if (email === 'admin@example.com' && password === 'Admin@1234') {
            const mockToken = 'mock-token';
            const mockUser = { name: 'Admin', email };

            localStorage.setItem('user', JSON.stringify({ token: mockToken, user: mockUser }));
            axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
            navigate('/');
        } else {
            setPassword('');
            setError('Invalid email or password.');
        }

        setLoading(false);
    };

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <div className="loginHeader">Login</div>
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="loginInput"
                        required
                    />
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="loginInput"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="passwordToggle"
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    {error && <div className="errorMessage">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
