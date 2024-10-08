import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/userContext";


export default function Header(){

   const {setUserInfo, userInfo} = useContext(UserContext);

    useEffect(() => {
      fetch('https://crud-mern-2caq.onrender.com/profile', {
        credentials:'include',
      }).then(response => {
        response.json().then(userInfo => {
            setUserInfo(userInfo);
        })
      })
    }, [])

    function logout(){
      fetch('https://crud-mern-2caq.onrender.com/logout', {
        credentials:'include',
        method: 'POST'
      });
      setUserInfo(null);
    }

    const username = userInfo?.username;
    return(
        <header>
        <Link to="/" className="logo">WhisperTales</Link>
        <nav>
          {(username && (
            <>
              <Link to="/create">Create new post</Link> 
              <a onClick={logout}>Logout</a>
            </>
          ))}
          {!username && (
            <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="register">Register</Link>
            </>
          )}
          
        </nav>
        </header>
    )
}