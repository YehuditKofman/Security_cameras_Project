import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Create_Member } from '../../Store/MemberSlice';
import { Create_Administrator } from '../../Store/AdministratorSlice';

const AxiosLogin = ({ memberData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleCreateAdmin = async () => {
            try {
                const { password, email } = memberData;
                const response = await axios.post(
                    `http://localhost:8080/Administators/loginAdministrator`,
                    {
                        email: memberData.email,
                        password: memberData.password,
                    }
                );
                if (response.data.role === 'Member') {
                    dispatch(Create_Member(response.data)); // קריאה ל-dispatch עם הנתונים
                }
                else{
                    dispatch(Create_Administrator(response.data));
                }

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
    }, [memberData, dispatch]); // הוספת dispatch לתלות

    return (
        <>
            <p>login</p>
        </>
    );
};

export default AxiosLogin;