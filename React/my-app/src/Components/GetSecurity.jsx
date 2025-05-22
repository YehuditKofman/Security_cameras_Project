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
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AxiosPeoplePerMinute from './Analys/AxiosPeoplePerMinute';
import usePeoplePerMinute from './Analys/AxiosPeoplePerMinute';
import AxiosDelete from './DeleteVideo/AxiosDelete'; // ✅ חדש
import { Dialog } from 'primereact/dialog';

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
    const [showDeleteDialog, setShowDeleteDialog] = useState(false); // הוסיפי שורה זו
    const videoRef = useRef(null);
    const menu = useRef(null);
    const videoUrl = `http://localhost:8080/videos/${video.fileName}`;
    const { data: peopleData, loading } = AxiosPeoplePerMinute({ recordingId: video.id });

    const formattedDate = new Date(video.date).toLocaleDateString('he-IL');
    const formattedTime = new Date(video.date).toLocaleTimeString('he-IL');

    const togglePlay = () => {
      if (!videoRef.current) return;
      playing ? videoRef.current.pause() : videoRef.current.play();
      setPlaying(!playing);
    };

   const handleDelete = async () => {
  await AxiosDelete({
    recordingId: video.id, // חשוב להשתמש ב־_id של MongoDB
    onDeleteSuccess: () => {
      setVideos((prev) => prev.filter((v) => v.id !== video.id));
    }
  });
  setShowDeleteDialog(false); // סגור את הדיאלוג אחרי מחיקה
};


    return (
      <div
        style={{
          width: '380px', // ✅ גודל קבוע
          backgroundColor: '#1e293b',
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 2px 8px rgba(0,0,0,0.50)',
        }}
      >
        <Button
          icon="pi pi-trash"
          className="p-button-sm p-button-text"
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            zIndex: 2,
            color: 'white',
          }}
          onClick={() => setShowDeleteDialog(true)} // פותח את הדיאלוג
        />
            <Dialog
                visible={showDeleteDialog}
                style={{ width: '350px' }}
                header="אישור מחיקה"
                modal
                className="p-fluid"
                onHide={() => setShowDeleteDialog(false)}
                footer={
                    <div>
                        <Button label="לא" icon="pi pi-times" onClick={() => setShowDeleteDialog(false)} className="p-button-text" />
                        <Button label="כן, מחק" icon="pi pi-check" onClick={handleDelete} className="p-button-danger" />
                    </div>
                }
            >
                <span>האם את/ה בטוח/ה שברצונך למחוק את הסרטון?</span>
            </Dialog>
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

        <div className="p-3" style={{ color: 'white', direction: 'rtl', justifyContent: 'center' }}>
          <div className="flex justify-content-between align-items-center mb-2">
            <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{formattedDate} {formattedTime}</div>
            <div>
              <Link
                to={{
                  pathname: "/analysis",
                }}
                state={{ showChart: true, recordingName: video.fileName, ID_video: video.id, peopleData: peopleData }}
              >
                <Button
                  className="p-button-sm p-button-text"
                  style={{
                    color: 'white',
                    backgroundColor: 'transparent',
                  }}
                >
                  <span className="pi pi-chart-line" style={{ fontSize: '1.3rem' }}></span>
                </Button>
              </Link>
            </div>
          </div>
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

      {/* ✅ שורת הכרטיסים הרספונסיבית */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center', // ✅ זה מה שמרכז
        }}
      >
        {videos.map((video) => (
          <VideoCard key={video.fileName} video={video} />
        ))}
      </div>
    </div>


  );
};

export default GetSecurity;
