// src/services/saveProduct.js
import axios from 'axios';

const AxiosUpdateMember = async (product, admin, token) => {
    try {
        const response = await axios.put(
            `http://localhost:8080/Administators/updateMemberByAdministrator/${product._id}`,
            {
                memberId: product._id,
                name: product.name,
                email: product.email,
                password: product.password,
                phone: product.phone,
                AccessPermissions: product.AccessPermissions,
                administartorID: admin._id,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export default AxiosUpdateMember;
