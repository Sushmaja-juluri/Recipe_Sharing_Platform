import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/auth/login', {
                email,
                password,
            });

            const { accessToken, user } = response.data;

            // Save token and user info in localStorage
            localStorage.setItem('user', JSON.stringify({ token: accessToken, user }));

            // Set default Authorization header for future requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            navigate('/');
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || 'Login failed');
            } else {
                setError('Network error. Please try again.');
            }
        }
    };

    return (
        <>
            <div id='loginContainer' className="loginContainer">
                <div id="loginCard" className='loginCard'>
                    <div id="loginHeader" className="loginHeader">Login</div>
                    <form onSubmit={(e) => handleLogin(e)} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}