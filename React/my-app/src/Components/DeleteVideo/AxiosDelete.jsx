
// import { useEffect } from 'react';
// import axios from 'axios';

// function AxiosDelete({ videoId, onDeleteSuccess }) {
//   useEffect(() => {
//       console.log('Trying to delete videoId:', videoId);

//     const deleteVideo = async () => {
//       try {
//         await axios.delete(`http://localhost:8080/SecurityCameras/deleteSecurityCamera/${videoId}`);
//         if (onDeleteSuccess) onDeleteSuccess();
//       } catch (error) {
//         console.error('שגיאה במחיקת ההסרטה:', error);
//         alert('אירעה שגיאה בעת המחיקה');
//       }
//     };

//     deleteVideo();
//   }, [videoId, onDeleteSuccess]);

//   return null; // לא מחזירה שום JSX – קומפוננטה שקופה
// }

// export default AxiosDelete;
// AxiosDelete.js
import axios from 'axios';

const AxiosDelete = async ({ recordingId, onDeleteSuccess }) => {
    console.log('Trying to delete recordingId:', recordingId);
  try {
    const response = await axios.delete(`http://localhost:8080/SecurityCameras/deleteSecurityCamera/${recordingId}`);
    console.log('ההסרטה נמחקה בהצלחה');
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  } catch (error) {
    console.error('שגיאה במחיקת ההסרטה:', error);
  }
};

export default AxiosDelete;
