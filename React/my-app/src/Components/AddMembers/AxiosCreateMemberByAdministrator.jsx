import React, { useEffect } from 'react';
import { Create_Member } from "../../Store/MemberSlice"; 

import axios from 'axios';
import { useDispatch } from 'react-redux';

const AxiosCreteMemberByAdministrator = ({ ID, memberData }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleCreateAdmin = async () => {
            try {
                const { Name, phone, password, email, AccessPermissions } = memberData;

                const preparedData = {

                    name: Name,
                    phone: `+${memberData.pre}${phone}`,
                    password,
                    email,
                    AccessPermissions: AccessPermissions.map(permission => ({
                        sortPermissions: permission,
                        isPermissions: true
                    })),
                };
                const response = await axios.post(
                    `http://localhost:8080/Administators/createMemberByAdministrator/${ID}`,
                    { ...preparedData }
                );
                const newId = response.data._id;
                dispatch(Create_Member({
                    _id: newId,
                    name: preparedData.name,
                    phone: preparedData.phone,
                    password: preparedData.password,
                    email: preparedData.email,
                    role: "Member",
                    arrPermetion: AccessPermissions
                }));
                //console.log('Administrator created successfully!', response.data.token);
                alert('Administrator created successfully!');
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
    }, [ID, memberData]); // שימי לב לתלות - רץ כשהערכים משתנים

    return (
        <>
            {/* אפשר לשים כאן משהו זמני אם את רוצה, אבל לא חובה */}
            <p>Creating member...</p>
        </>
    );
};

export default AxiosCreteMemberByAdministrator;
