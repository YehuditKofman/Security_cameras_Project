import React from 'react';

const PersonalInfo = ({ formData, handleChange }) => (
    <div className="personal-info">
        <h2>Personal details</h2>
        <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

    </div>
);

export default PersonalInfo;
