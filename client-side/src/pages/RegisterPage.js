import { useState } from "react";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(e){
        e.preventDefault();
        await fetch('https://crud-mern-2caq.onrender.com/register', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type' : 'application/json'},
        });
        if(Response.ok === 400){
            alert('registration failed')
           
        }else{
            alert('registration successful')
        }
    }
    return(
        <div className="form">
            <p>Welcome</p>
            <form action="" className="register" onSubmit={register}>
                <h2>Register</h2>
                <input 
                    type="text" 
                    placeholder="username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                    ></input>
                <input 
                    type="password" 
                    placeholder="password"
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                ></input>
                <button>Register</button>
            </form>
        </div>
    )
}