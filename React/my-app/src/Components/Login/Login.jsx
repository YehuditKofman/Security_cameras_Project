import React, { useState } from 'react';
import AxiosLogin from './AxiosLogin';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flag, setFlag] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const handleClick = () => {
        setFlag(!flag);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f5f5f5',
                padding: '1rem',
            }}
        >
            <Card
                style={{
                    width: '400px',
                    padding: '2rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#ffffff',
                }}
                title="Login"
                subTitle="Please enter your credentials"
            >
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="email" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#555' }}>
                            Email
                        </label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            style={{ borderRadius: '6px', fontSize: '0.9rem' }}
                            required
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="password" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#555' }}>
                            Password
                        </label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            toggleMask
                            feedback={false}
                            placeholder="Enter your password"
                            style={{ borderRadius: '6px', fontSize: '0.9rem' }}
                            required
                        />
                    </div>
                    <div className="p-field">
                        <Button
                            label="Login"
                            icon="pi pi-sign-in"
                            className="p-button-primary"
                            type="submit"
                            onClick={handleClick}
                            style={{
                                width: '100%',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: '6px',
                            }}
                        />
                    </div>
                    {flag && (
                        <AxiosLogin
                            memberData={{
                                password: password,
                                email: email,
                            }}
                        />
                    )}
                </form>
            </Card>
        </div>
    );
};

export default Login;