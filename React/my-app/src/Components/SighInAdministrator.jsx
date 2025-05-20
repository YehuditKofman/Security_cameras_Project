import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import CreateAdministrator from './CreateAdministrator';
import { sendVerificationEmail } from './EmailSender'; // ייבוא הפונקציה לשליחת המייל


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const SignInAdministrator = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        termsAccepted: false,
    });

    const [emailError, setEmailError] = useState('');
    const [shouldCreateAdmin, setShouldCreateAdmin] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [sentCode, setSentCode] = useState('');
    const [codeVerified, setCodeVerified] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData((prev) => ({ ...prev, [name]: newValue }));

        if (name === 'email') {
            validateEmail(newValue);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(emailRegex.test(email) ? '' : 'Invalid email address');
    };

    const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSubmit = async () => {
        if (!formData.termsAccepted) {
            alert('You must accept the terms and conditions.');
            return;
        }

        if (emailError || !formData.email || !formData.name || !formData.password) {
            alert('Please complete the form correctly.');
            return;
        }

        if (hasSubmitted) return;

        const code = generateVerificationCode();
        setSentCode(code);
        await sendVerificationEmail(formData.email, code); // קריאה לפונקציה לשליחת המייל

        setShouldCreateAdmin(false);
        setHasSubmitted(true);
    };

    const verifyCode = () => {
        if (verificationCode === sentCode) {
            setCodeVerified(true);
            setShouldCreateAdmin(true);
        } else {
            alert('Invalid verification code. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5', padding: '1rem', flexDirection: 'column' }}>
            <Card title="Administrator Registration" subTitle="Please fill in the details below" style={{ width: '400px', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="name">Full Name</label>
                        <InputText id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                    </div>

                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
                        {emailError && <small style={{ color: 'red' }}>{emailError}</small>}
                    </div>

                    <div className="p-field">
                        <label htmlFor="phone">Phone</label>
                        <InputText id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
                    </div>

                    <div className="p-field">
                        <label htmlFor="password">Password</label>
                        <Password id="password" name="password" value={formData.password} onChange={handleChange} toggleMask feedback={false} placeholder="Enter your password" />
                    </div>

                    <div className="p-field-checkbox">
                        <Checkbox inputId="termsAccepted" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                        <label htmlFor="termsAccepted">I accept the terms and conditions</label>
                    </div>

                    <Button label="Create Administrator" icon="pi pi-check" className="p-button-success" onClick={handleSubmit} disabled={hasSubmitted} />
                </div>
            </Card>

            {hasSubmitted && !codeVerified && (
                <div>
                    <InputText placeholder="Enter verification code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                    <Button label="Verify Code" onClick={verifyCode} />
                </div>
            )}

            {shouldCreateAdmin && <CreateAdministrator adminData={formData} />}
        </div>
    );
};

export default SignInAdministrator;
