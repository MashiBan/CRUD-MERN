import { useState } from "react";

// Use environment variable for API base URL
import {API_BASE_URL} from '../config.js';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(e) {
        e.preventDefault();
        
        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Registration failed');
        }
    }

    return (
        <div className="form">
            <p>Welcome</p>
            <form className="register" onSubmit={register}>
                <h2>Register</h2>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
