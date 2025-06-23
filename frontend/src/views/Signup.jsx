import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            console.log("Starting signup process...");
            console.log("Base URL:", axios.defaults.baseURL);
            
            const payload = { username, email, password };
            console.log("Request payload:", payload);

            const response = await axios.post('/auth/signup', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("Response received:", response);

            if (!response.data) {
                throw new Error("Empty response from server");
            }

            const { accessToken, user } = response.data;
            if (!accessToken || !user) {
                throw new Error("Invalid response structure");
            }

            localStorage.setItem('user', JSON.stringify({ token: accessToken, user }));
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            console.log("Authentication successful, redirecting...");
            navigate('/', { replace: true });

        } catch (err) {
            console.error("Signup error:", err);
            
            let errorMessage = 'Signup failed';
            if (err.response) {
                console.error("Response error:", err.response.data);
                errorMessage = err.response.data?.error || 
                             err.response.data?.message || 
                             `Server error: ${err.response.status}`;
            } else if (err.request) {
                console.error("No response received");
                errorMessage = 'No response from server. Check your connection.';
            } else {
                console.error("Request setup error:", err.message);
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id='loginContainer' className="loginContainer">
            <div id="loginCard" className='loginCard'>
                <div id="loginHeader" className="loginHeader">Sign Up</div>
                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                    <input
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                    {error && (
                        <div style={{ color: 'red', margin: '10px 0' }}>
                            Error: {error}
                        </div>
                    )}
                    <button 
                        type='submit' 
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}