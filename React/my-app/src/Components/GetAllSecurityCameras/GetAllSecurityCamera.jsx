// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function SecurityCamerasRecordings() {
//     const [recordings, setRecordings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchRecordings = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/68043ccf8b5cb28fe901eb41'); // עדכן את ה-URL בהתאם
//                 setRecordings(response.data); // הנחה שהנתונים מגיעים במבנה הנכון
//             } catch (err) {
//                 setError('Error fetching recordings');
//                 console.error(err);

//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecordings();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>{error}</div>;
//     }

//     return (
//         <div>
//             <h2>Security Camera Recordings</h2>
//             <ul>
//                 {recordings.map((recording) => (
//                     <li key={recording.id}> {/* הנחה שיש שדה id */}
//                         <p>Route: {recording.filePath}</p> {/* הנחה שהמאפיין נקרא route */}
//                         <p>Length: {recording.length}</p> {/* הנחה שיש שדה length */}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default SecurityCamerasRecordings;


// client/src/components/VideoPlayer.js
import React from 'react';

const VideoPlayer = ({ filename }) => {
  return (
    <video width="640" height="360" controls>
      <source src={`http://localhost:8080/videos/1746042985280-176516495.mp4`} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
   
 
 