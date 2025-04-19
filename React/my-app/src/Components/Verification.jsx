import React from 'react';
import { Password } from 'primereact/password';

const Verification = ({ formData, handleChange }) => (
    <div>
        <h2>Verification</h2>
        <label>Password:</label>
        <div className="card flex -content-center">
            <Password 
                name="password"
                value={formData.password}
                onChange={handleChange}
                toggleMask 
            />
        </div>
    </div>
);

export default Verification;
