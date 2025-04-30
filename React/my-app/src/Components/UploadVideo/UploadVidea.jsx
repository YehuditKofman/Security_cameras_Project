import React, { useState } from 'react';
import axios from 'axios';

function UploadVideo() {
    const adminId = '68043ccf8b5cb28fe901eb41' // Assuming you have the adminId stored in localStorage
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const token = localStorage.getItem("token"); // אם אתה שומר את הטוקן ב-localStorage
    if (!token) {
      setError("Token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!video) {
            alert('Please select a video to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('video', video);
        formData.append('length', 60); // כאן אפשר להוסיף אורך הסרטה ידנית או לחשב

        try {
            const response = await axios.post(
                `http://localhost:8080/Administators/createSecurityCamerasByAdministrator/${adminId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`, // הוספת הכותרת Authorization
                    },
                }
            );
            alert('Upload successful!');
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading video:', error);
            alert('Upload failed.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button type="submit">Upload Video</button>
        </form>
    );
}

export default UploadVideo;
