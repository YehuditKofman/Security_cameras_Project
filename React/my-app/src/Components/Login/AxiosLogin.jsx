import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Create_Member } from '../../Store/MemberSlice';
import { Create_Administrator } from '../../Store/AdministratorSlice';

const AxiosLogin = ({ memberData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLogin = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8080/Administators/loginAdministrator`,
                    {
                        email: memberData.email,
                        password: memberData.password,
                    }
                );

                const token = response.data.token;
                localStorage.setItem('token', token);
                
                if (response.data.role === 'Member') {
                    dispatch(Create_Member(response.data));
                } else {
                    dispatch(Create_Administrator(response.data));
                }
                console.log('Login successful!', response.data);
                alert('Login successful!');
            } catch (error) {
                const message =
                    error.response?.data?.message || 'Unexpected error occurred';
                console.error('Login failed:', message);
                alert('Login failed: ' + message);
            }
        };

        handleLogin();
    }, [memberData, dispatch]);

    return null; // לא צריך להציג שום דבר
};

export default AxiosLogin;
