import axios from 'axios';

export const sendVerificationEmail = async (email, code) => {
    try {
        const response = await axios.post('http://localhost:8080/send-email', {
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is: ${code}`,
        });
        console.log('Sending email with:', {
            to: email,
            subject: 'Verification Code',
            text: `Your verification code is: ${code}`,
        });
        
        return response.data;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // זורק שגיאה במקרה של כישלון

    }
};