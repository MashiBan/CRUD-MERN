import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Header() {
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch(`${API_BASE_URL}/profile`, {
            credentials: 'include',
        })
        .then(response => response.json())
        .then(userInfo => {
            setUserInfo(userInfo);
        })
        .catch(error => console.error('Error fetching profile:', error));
    }, [setUserInfo]);

    async function logout() {
        try {
            const response = await fetch(`${API_BASE_URL}/logout`, {
                credentials: 'include',
                method: 'POST'
            });

            if (response.ok) {
                setUserInfo(null);
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="/" className="logo">WhisperTales</Link>
            <nav>
                {username ? (
                    <>
                        <Link to="/create">Create new post</Link> 
                        <a onClick={logout} style={{ cursor: 'pointer' }}>Logout</a>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login">Login</Link>
                        <Link to="/register" className="register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
