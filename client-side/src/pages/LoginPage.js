import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    async function login(e) {
        e.preventDefault();
        const response = await fetch('https://crud-mern-2caq.onrender.com/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // include cookies
        });

        if (response.ok) {
            response.json().then(data => {
                // Assuming the response contains a token and userInfo
                const { token, userInfo } = data;

                // Store the token in a cookie
                document.cookie = `token=${token}; path=/; SameSite=Lax`;

                // Set the user information in context
                setUserInfo(userInfo);

                // Redirect the user after successful login
                setRedirect(true);
            });
        } else {
            const error = await response.json();
            alert(error.message || 'Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />;
    }

    return (
        <div className="form">
            <p>Welcome Back</p>
            <form action="" className="login" onSubmit={login}>
                <h2>Login</h2>
                <input 
                    type="text" 
                    placeholder="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Login</button>
            </form>
        </div>
    );
}
