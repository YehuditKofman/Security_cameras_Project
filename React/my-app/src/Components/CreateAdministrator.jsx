// AxiosCreateAdministrator.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Create_Administrator } from '../Store/AdministratorSlice';
import { Create_User } from '../Store/UserSlice';

const CreateAdministrator = ({ adminData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleCreateAdmin = async () => {
            try {
                const { name, phone, password, email } = adminData;

                const preparedData = {
                    name,
                    phone,
                    password,
                    email,
                    arrMembers: [],
                    arrSecurityCameras: [],
                    arrAnalysisSchema: [],
                };

                const response = await axios.post(
                    'http://localhost:8080/Administators/createAdministrator',
                    preparedData
                );
                console.log(response.data);
                const newId = response.data._id;
                const token = response.data.token; // קבלת הטוקן
                
                // שמירת הטוקן ב-localStorage
                localStorage.setItem('token', token);


                dispatch(Create_Administrator({
                    _id: newId,
                    ...preparedData,
                    role: 'Administrator',
                }));

                alert('Administrator created successfully!');
                 dispatch(Create_User({ role: response.data.role ,name: response.data.name}));
                
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
    }, [adminData]);

    return <p>Creating administrator...</p>;
};

export default CreateAdministrator;
