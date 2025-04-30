import React, { useEffect } from 'react';
import axios from 'axios';

const AxiosLogin = ({ memberData }) => {
    useEffect(() => {
        const handleCreateAdmin = async () => {
            try {
                const {  password, email  } = memberData;
                const preparedData = {
                    password,
                    email
                };
                const response = await axios.post(
                    `http://localhost:8080/Administators/loginAdministrator`,    {
                        email: memberData.email,
                        password: memberData.password
                    }

                );
               
                alert('Login created successfully!');
            } catch (error) {
                if (error.response) {

                    console.error('Failed to create administrator:', error.response.data);
                    alert('Failed to create administrator: ' + error.response.data.message);
                } else {
                    console.error('Error during creation:', error.message);
                    alert('Error during creation: ' + error.message);
                }
            }
        };

        handleCreateAdmin();
    }, [memberData]); // שימי לב לתלות - רץ כשהערכים משתנים

    return (
        <>
            {/* אפשר לשים כאן משהו זמני אם את רוצה, אבל לא חובה */}
            <p>login</p>
        </>
    );
};

export default AxiosLogin;
