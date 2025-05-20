// import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
// import { Menu } from 'primereact/menu';
// import { Badge } from 'primereact/badge';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useEffect, useRef, useState } from 'react';

// const GetSecurity = () => {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const admin = useSelector((state) => state.AdministratorSlice);

//   useEffect(() => {
//     if (!admin._id) return;

//     const fetchVideos = async () => {
//       try {
//         const { data } = await axios.get(`http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/${admin._id}`);
//         const videoData = data.map(v => ({
//           filePath: v.filePath,
//           fileName: v.filePath?.slice(8),
//           date: v.date
//         }));
//         setVideos(videoData);
//         console.log("videoData", data);
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
//     const videoUrl = `http://localhost:8080/videos/${video.fileName}`;

//     const togglePlay = () => {
//       if (!videoRef.current) return;
//       if (playing) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setPlaying(!playing);
//     };

//     const menuItems = [
//       {
//         label: 'אפשרויות',
//         items: [
//           { label: 'שיתוף', icon: 'pi pi-share-alt' },
//           { label: 'הורדה', icon: 'pi pi-download' },
//           { label: 'דיווח', icon: 'pi pi-flag' }
//         ]
//       }
//     ];

//     const footer = (
//       <div className="flex justify-content-between align-items-center p-2" style={{ direction: 'rtl' }}>
//         <div className="flex align-items-center">
//           <i className="pi pi-circle-fill text-green-500 mr-2" style={{ fontSize: '0.7rem' }}></i>
//           <span className="text-white">שידור חי</span>
//         </div>
//         <Button label="צפה בהקלטות" className="p-button-primary p-button-sm" />
//       </div>
//     );

//     // העדכון כאן - מתווספת השעה בנוסף לתאריך
//     const formattedDate = new Date(video.date).toLocaleDateString('he-IL', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });

//     const formattedTime = new Date(video.date).toLocaleTimeString('he-IL', {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     });

//     return (
//       <Card
//         key={video.fileName}
//         style={{
//           backgroundColor: '#1e293b',
//           color: 'white',
//           borderRadius: '8px',
//           overflow: 'hidden',
//           width: '300px',  // הקטנתי את רוחב הכרטיס
//           display: 'flex',
//           flexDirection: 'column',
//           padding: '0',
//           margin: '0.5rem', // צמצום המרווחים
//         }}
//         footer={footer}
//       >
//         {/* הסרטון עכשיו תופס את כל החלק העליון של הכרטיס */}
//         <div className="relative" style={{
//           backgroundColor: '#a0a0a0',
//           width: '100%',
//           height: '150px',  // הקטנתי את הגובה של הסרטון
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <video ref={videoRef} width="100%" height="100%" style={{ borderRadius: '8px', objectFit: 'cover' }}>
//             <source src={videoUrl} type="video/mp4" />
//             הדפדפן שלך אינו תומך בניגון וידאו.
//           </video>
//           <Button
//             icon={playing ? 'pi pi-pause' : 'pi pi-play'}
//             className="p-button-rounded p-button-outlined absolute"
//             style={{
//               backgroundColor: 'rgba(255, 255, 255, 0.7)',
//               border: '2px solid white',
//               width: '40px',
//               height: '40px',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)'
//             }}
//             onClick={togglePlay}
//           />
//         </div>

//         {/* החלק התחתון של הכרטיס - המידע */}
//         <div className="flex flex-column justify-content-between p-2" style={{ width: '100%' }}>
//           <div>
//             <h3 className="m-0 text-lg">Elisheva Oyerbach</h3>
//             <div className="flex align-items-center gap-2 text-gray-300 mt-2" style={{ fontSize: '0.75rem' }}>
//               <i className="pi pi-calendar"></i>
//               <span>{formattedDate}</span>
//               <i className="pi pi-clock ml-2"></i>
//               <span>{formattedTime}</span>
//             </div>
//           </div>
//           <div className="mt-2">
//             <Menu model={menuItems} popup ref={menu} />
//             <Button
//               icon="pi pi-bars"
//               className="p-button-text p-button-rounded text-white"
//               onClick={(e) => menu.current.toggle(e)}
//               aria-label="אפשרויות"
//             />
//           </div>
//           <div className="absolute" style={{ top: '10px', right: '10px' }}>
//             <Badge value="פרטיות" severity="warning" style={{ fontWeight: 'bold', direction: 'rtl' }} />
//           </div>
//         </div>
//       </Card>
//     );
//   };

//   if (loading) return <div>טוען סרטונים...</div>;
//   if (!videos.length) return <div>לא נמצאו סרטונים למנהל זה.</div>;

//   return (
//     <div className="p-4" style={{
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '1.5rem',
//       justifyContent: 'center'
//     }}>
//       {videos.map(video => (
//         <VideoCard key={video.fileName} video={video} />
//       ))}
//     </div>
//   );
// };

// export default GetSecurity;
// ספריות
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import UploadVideo from './UploadVideo/UploadVidea';
import Dashboard from './Analys/Anyles';
import { Link } from 'react-router-dom';

const GetSecurity = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const admin = useSelector((state) => state.AdministratorSlice);

  useEffect(() => {
    if (!admin._id) return;
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/${admin._id}`
        );
        const videoData = data.map((v) => ({
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
    const videoUrl = `http://localhost:8080/videos/${video.fileName}`;

    const togglePlay = () => {
      if (!videoRef.current) return;
      playing ? videoRef.current.pause() : videoRef.current.play();
      setPlaying(!playing);
    };

    // const menuItems = [
    //   {
    //     label: 'לצפיה שבסכמה',

    //   },
    // ];

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
            הדפדפן שלך אינו תומך בווידאו.
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
              {/* <Menu model={menuItems} popup ref={menu} />
              <Button
                icon="pi pi-bars"
                className="p-button-text text-white"
                onClick={(e) => menu.current.toggle(e)}
              /> */}
              <Link
                to={{
                  pathname: "/analysis",
                }}
                state={{ showChart: true }}
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
      {/* כותרת ופעולות */}
      <div className="flex justify-content-between align-items-center mb-4">
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>מצלמות</div>
          <div style={{ color: '#6b7280' }}>צפייה ישירה וניהול מצלמות</div>
        </div>
        <div className="flex gap-2">
          {/* <Button
            label="הוסף מצלמה"
            icon="pi pi-plus"
            className="p-button-primary"
            onClick={() => setflag(!flag)}
          /> */}
          {<UploadVideo />}
          {/* <Button label="הגדרות" icon="pi pi-cog" className="p-button-outlined" /> */}
        </div>
      </div>


      {/* גריד */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {videos.map((video) => (
          <VideoCard key={video.fileName} video={video} />
        ))}
      </div>
    </div>
  );
};

export default GetSecurity;



