
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

const PersonalArea = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = useSelector((state) => state.AdministratorSlice);

  useEffect(() => {
    if (!admin._id) return;

    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/${admin._id}`);
        const videoData = data.map(v => ({
          filePath: v.filePath,
          fileName: v.filePath?.slice(8),
          date: v.date
        }));
        setVideos(videoData);
        console.log("videoData", data);
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
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    };

    const menuItems = [
      {
        label: 'אפשרויות',
        items: [
          { label: 'שיתוף', icon: 'pi pi-share-alt' },
          { label: 'הורדה', icon: 'pi pi-download' },
          { label: 'דיווח', icon: 'pi pi-flag' }
        ]
      }
    ];

    const footer = (
      <div className="flex justify-content-between align-items-center p-2" style={{ direction: 'rtl' }}>
        <div className="flex align-items-center">
          <i className="pi pi-circle-fill text-green-500 mr-2" style={{ fontSize: '0.7rem' }}></i>
          <span className="text-white">שידור חי</span>
        </div>
        <Button label="צפה בהקלטות" className="p-button-primary p-button-sm" />
      </div>
    );

    // העדכון כאן - מתווספת השעה בנוסף לתאריך
    const formattedDate = new Date(video.date).toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const formattedTime = new Date(video.date).toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    return (
      <Card
        key={video.fileName}
        style={{
          backgroundColor: '#1e293b',
          color: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          width: '300px',  // הקטנתי את רוחב הכרטיס
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          margin: '0.5rem', // צמצום המרווחים
        }}
        footer={footer}
      >
        {/* הסרטון עכשיו תופס את כל החלק העליון של הכרטיס */}
        <div className="relative" style={{
          backgroundColor: '#a0a0a0',
          width: '100%',
          height: '150px',  // הקטנתי את הגובה של הסרטון
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <video ref={videoRef} width="100%" height="100%" style={{ borderRadius: '8px', objectFit: 'cover' }}>
            <source src={videoUrl} type="video/mp4" />
            הדפדפן שלך אינו תומך בניגון וידאו.
          </video>
          <Button
            icon={playing ? 'pi pi-pause' : 'pi pi-play'}
            className="p-button-rounded p-button-outlined absolute"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              border: '2px solid white',
              width: '40px',
              height: '40px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={togglePlay}
          />
        </div>

        {/* החלק התחתון של הכרטיס - המידע */}
        <div className="flex flex-column justify-content-between p-2" style={{ width: '100%' }}>
          <div>
            <h3 className="m-0 text-lg">Elisheva Oyerbach</h3>
            <div className="flex align-items-center gap-2 text-gray-300 mt-2" style={{ fontSize: '0.75rem' }}>
              <i className="pi pi-calendar"></i>
              <span>{formattedDate}</span>
              <i className="pi pi-clock ml-2"></i>
              <span>{formattedTime}</span>
            </div>
          </div>
          <div className="mt-2">
            <Menu model={menuItems} popup ref={menu} />
            <Button
              icon="pi pi-bars"
              className="p-button-text p-button-rounded text-white"
              onClick={(e) => menu.current.toggle(e)}
              aria-label="אפשרויות"
            />
          </div>
          <div className="absolute" style={{ top: '10px', right: '10px' }}>
            <Badge value="פרטיות" severity="warning" style={{ fontWeight: 'bold', direction: 'rtl' }} />
          </div>
        </div>
      </Card>
    );
  };

  if (loading) return <div>טוען סרטונים...</div>;
  if (!videos.length) return <div>לא נמצאו סרטונים למנהל זה.</div>;

  return (
    <div className="p-4" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      justifyContent: 'center'
    }}>
      {videos.map(video => (
        <VideoCard key={video.fileName} video={video} />
      ))}
    </div>
  );
};

export default PersonalArea;
