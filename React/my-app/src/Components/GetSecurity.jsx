


// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { Menu } from 'primereact/menu';
// import { Badge } from 'primereact/badge';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useEffect, useRef, useState } from 'react';
// import UploadVideo from './UploadVideo/UploadVidea';
// import Dashboard from './Analys/Anyles';
// import { Link } from 'react-router-dom';
// import AxiosPeoplePerMinute from './Analys/AxiosPeoplePerMinute';

// const GetSecurity = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showChart, setShowChart] = useState(false);
//   const [recordingName, setRecordingName] = useState("");
//   const admin = useSelector((state) => state.AdministratorSlice);

//   useEffect(() => {
//     if (!admin._id) return;
//     const fetchVideos = async () => {
//       try {
//         const { data } = await axios.get(
//           `http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/${admin._id}`
//         );
//         const videoData = data.map((v) => ({
//           id: v._id,
//           filePath: v.filePath,
//           fileName: v.filePath?.slice(8),
//           date: v.date,
//         }));
//         setVideos(videoData);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchVideos();
//   }, [admin._id]);

//   const VideoCard = ({ video }) => {
//     const [playing, setPlaying] = useState(false);
//     const videoRef = useRef(null);
//     const menu = useRef(null);
//     console.log(video.fileName);
//     const videoUrl = `http://localhost:8080/videos/${video.fileName}`;
//     const togglePlay = () => {
//       if (!videoRef.current) return;
//       playing ? videoRef.current.pause() : videoRef.current.play();
//       setPlaying(!playing);
//     };
//     const { data2, loading } = AxiosPeoplePerMinute(video._id);

//     const formattedDate = new Date(video.date).toLocaleDateString('he-IL');
//     const formattedTime = new Date(video.date).toLocaleTimeString('he-IL');

//     return (
//       <div
//         style={{
//           width: 'calc(100% / 3 - 1rem)',
//           backgroundColor: '#1e293b',
//           borderRadius: '12px',
//           overflow: 'hidden',
//           position: 'relative',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <div
//           style={{
//             height: '180px',
//             backgroundColor: '#ccc',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             position: 'relative',
//           }}
//         >
//           <video
//             ref={videoRef}
//             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//           >
//             <source src={videoUrl} type="video/mp4" />
//           </video>
//           <Button
//             icon={playing ? 'pi pi-pause' : 'pi pi-play'}
//             className="p-button-rounded p-button-outlined"
//             style={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               backgroundColor: 'rgba(255,255,255,0.7)',
//               border: '2px solid white',
//             }}
//             onClick={togglePlay}
//           />
//         </div>

//         <div className="p-3" style={{ color: 'white', direction: 'rtl' }}>
//           <div className="flex justify-content-between align-items-center mb-2">
//             <div>
//               <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>מצלמה ראשית</div>
//               <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{formattedDate} {formattedTime}</div>
//             </div>
//             <div>

//               <Link
//                 to={{
//                   pathname: "/analysis",
//                 }}
//                 state={{ showChart: true, recordingName: video.fileName, ID_video: video.id }}
//               >

//                 <Button
//                   label="לצפיה בסכמה"
//                   icon="pi pi-chart-bar"
//                   className="p-button-outlined"
//                 />
//               </Link>
//             </div>
//           </div>
//           <Badge value="פעיל" severity="success" style={{ direction: 'rtl' }} />
//         </div>
//       </div>
//     );
//   };

//   if (loading) return <div>טוען...</div>;

//   return (
//     <div className="p-4" style={{ direction: 'rtl' }}>
//       {/* כותרת ופעולות */}
//       <div className="flex justify-content-between align-items-center mb-4">
//         <div>
//           <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>מצלמות</div>
//           <div style={{ color: '#6b7280' }}>צפייה ישירה וניהול מצלמות</div>
//         </div>
//         <div className="flex gap-2">

//           {<UploadVideo />}
//         </div>
//       </div>


//       {/* גריד */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
//         {videos.map((video) => (
//           <VideoCard key={video.fileName} video={video} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GetSecurity;
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { use, useEffect, useRef, useState } from 'react';
import UploadVideo from './UploadVideo/UploadVidea';
import Dashboard from './Analys/Anyles';
import { Link } from 'react-router-dom';
import AxiosPeoplePerMinute from './Analys/AxiosPeoplePerMinute';
import usePeoplePerMinute from './Analys/AxiosPeoplePerMinute'; // ✅ הוספה

const GetSecurity = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [recordingName, setRecordingName] = useState("");
  const admin = useSelector((state) => state.AdministratorSlice);
  const [peopleData, setPeopleData] = useState([]);

  useEffect(() => {
    if (!admin._id) return;
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/${admin._id}`
        );
        const videoData = data.map((v) => ({
          id: v._id,
          filePath: v.filePath,
          fileName: v.filePath?.slice(8),
          date: v.date,
        }));
        setVideos(videoData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [admin._id]);

  const VideoCard = ({ video }) => {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef(null);
    const menu = useRef(null);
    console.log(video.fileName);
    const videoUrl = `http://localhost:8080/videos/${video.fileName}`;
    console.log(video.id, "vidio id")
    const { data: peopleData, loading } = AxiosPeoplePerMinute({ recordingId: video.id });
    //setPeopleData(peopleData)
    console.log("peopleData:", peopleData);
    const togglePlay = () => {
      if (!videoRef.current) return;
      playing ? videoRef.current.pause() : videoRef.current.play();
      setPlaying(!playing);
    };
  

    const formattedDate = new Date(video.date).toLocaleDateString('he-IL');
    const formattedTime = new Date(video.date).toLocaleTimeString('he-IL');

    return (
      <div
        style={{
          width: 'calc(100% / 3 - 1rem)',
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: '180px',
            backgroundColor: '#ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <video
            ref={videoRef}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <Button
            icon={playing ? 'pi pi-pause' : 'pi pi-play'}
            className="p-button-rounded p-button-outlined"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '2px solid white',
            }}
            onClick={togglePlay}
          />
        </div>

        <div className="p-3" style={{ color: 'white', direction: 'rtl' }}>
          <div className="flex justify-content-between align-items-center mb-2">
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>מצלמה ראשית</div>
              <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{formattedDate} {formattedTime}</div>
            </div>
            <div>

              <Link
                to={{
                  pathname: "/analysis",
                }}
                state={{ showChart: true, recordingName: video.fileName, ID_video: video.id, peopleData: peopleData }}
              >
                <Button
                  label="לצפיה בסכמה"
                  icon="pi pi-chart-bar"
                  className="p-button-outlined"
                />
              </Link>


            </div>
          </div>
          <Badge value="פעיל" severity="success" style={{ direction: 'rtl' }} />
        </div>
      </div>
    );
  };

  if (loading) return <div>טוען...</div>;

  return (
    <div className="p-4" style={{ direction: 'rtl' }}>
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>מצלמות</div>
          <div style={{ color: '#6b7280' }}>צפייה ישירה וניהול מצלמות</div>
        </div>
        <div className="flex gap-2">
          {<UploadVideo />}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {videos.map((video) => (
          <VideoCard key={video.fileName} video={video} />
        ))}
      </div>
    </div>
  );
};

export default GetSecurity;





