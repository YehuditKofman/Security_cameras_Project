import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const admin = useSelector((state) => state.AdministratorSlice);
  const adminId = admin._id;

  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!video) {
      alert('יש לבחור קובץ וידאו קודם.');
      return;
    }

    if (!token) {
      setError("Token is missing. Please log in again.");
      return;
    }

    const formData = new FormData();
    formData.append('video', video);
    formData.append('length', 70);
    formData.append('administartorID', adminId);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8080/Administators/createSecurityCamerasByAdministrator/${adminId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('הסרטון הועלה בהצלחה!');
      console.log(response.data);
    } catch (error) {
      console.error('שגיאה בהעלאת הסרטון:', error);
      alert('ההעלאה נכשלה.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 align-items-center mt-2">
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="upload-input"
      />
      <label htmlFor="upload-input">
        <Button
          color='var(--accent-green)'
          label="בחר מצלמה"
          icon="pi pi-upload"
          className="p-button-outlined"
          type="button"
          style={{
    borderColor: 'var(--accent-green)',
    color: 'var(--accent-green)',
    boxShadow: '0 0 8px #29cc8b',

  }}
          onClick={() => document.getElementById("upload-input").click()}
        />
      </label>
   <Button
  label={loading ? 'מעלה...' : 'העלה וידאו'}
  icon="pi pi-check"
  className="p-button"
  type="submit"
  disabled={loading}
  style={{
    backgroundColor: 'var(--accent-green)',
    borderColor: 'var(--accent-green)',
    color: 'var(--card-bg)',
    boxShadow: '0 0 8px #29cc8b',

  }}
/>
    </form>
  );
};

export default UploadVideo;
