import React, { useState } from 'react';
import AxiosLogin from './AxiosLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // כאן תוכל להוסיף את הלוגיקה של ההתחברות
        console.log('Email:', email);
        console.log('Password:', password);
    };
    const handleClick = () => {
        setFlag(!flag);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            </div>
            <button type="submit" onClick={handleClick}>Login</button>
            {flag && <AxiosLogin memberData={{
                    password: password,
                    email: email
                }}  />}


        </form>
    );
};

export default Login;
