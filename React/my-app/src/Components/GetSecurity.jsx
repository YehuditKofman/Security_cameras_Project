import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';
import axios from 'axios';
import { useSelector } from 'react-redux';

const GetSecurity = () => {
  const [videoFilename, setVideoFilename] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playing, setPlaying] = useState(false); 
  const videoRef = useRef(null); 
  const menu = useRef(null);
  
  const admin = useSelector((state)=>state.AdministratorSlice); // Assuming you have a Redux slice for administrator
  console.log(admin._id); 

  useEffect(() => {
    if (!admin._id) return;

    const fetchVideo = async () => {
      try {
        console.log(admin._id); // Check if admin ID is available
        const response = await axios.get(`http://localhost:8080/Administators/getAllSecurityCamerasByAdministrator/${admin._id}`); // Update the URL as needed
        console.log(response.data); // Check the response data
        const videoData = response.data;
        if (videoData.length > 0) {
          setVideoFilename(videoData[0].filePath);
        }
      } catch (err) {
        setError('Error fetching video data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [admin._id]); // Fetch video when admin ID changes

  const togglePlay = () => {
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

  const menuButton = (
    <Button 
      icon="pi pi-bars" 
      className="p-button-text p-button-rounded text-white" 
      onClick={(e) => menu.current.toggle(e)}
      aria-label="אפשרויות"
    />
  );

  const footer = (
    <div className="flex justify-content-between align-items-center p-2" style={{ direction: 'rtl' }}>
      <div className="flex align-items-center">
        <i className="pi pi-circle-fill text-green-500 mr-2" style={{ fontSize: '0.7rem' }}></i>
        <span className="text-white">שידור חי</span>
      </div>
      <Button 
        label="צפה בהקלטות" 
        className="p-button-primary p-button-sm"
        style={{ borderRadius: '4px', fontSize: '0.9rem' }}
      />
    </div>
  );

  if (loading) {
    return <div>טוען...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    
    <div className="video-card-container" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <Card 
        style={{ 
          backgroundColor: '#1e293b', 
          color: 'white',
          borderRadius: '8px',
          overflow: 'hidden',
          padding: 0
        }}
        footer={footer}
      >
        {/* Video Player Section */}
        <div 
          className="video-player-container relative" 
          style={{ 
            backgroundColor: '#a0a0a0', 
            aspectRatio: '16/9', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center' 
          }}
        >
          {videoFilename ? (
            <>
              <video 
                ref={videoRef} 
                width="100%" 
                height="100%" 
                style={{ borderRadius: '8px', maxHeight: '360px' }}
              >
                <source src={`http://localhost:8080/videos/1746144507142-934242871.mp4`} type="video/mp4" />
                הדפדפן שלך אינו תומך בניגון וידאו.
              </video>
              <Button 
                icon={playing ? "pi pi-pause" : "pi pi-play"} 
                className="p-button-rounded p-button-outlined absolute" 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                  border: '2px solid white', 
                  width: '60px', 
                  height: '60px', 
                  top: '50%', 
                  left: '50%', 
                  transform: 'translate(-50%, -50%)' 
                }}
                onClick={togglePlay}
              />
            </>
          ) : (
            <div style={{ color: 'white', textAlign: 'center' }}>לא נמצאה סרטה</div>
          )}
        </div>

        
        {/* Video Info Section */}
        <div className="video-info flex justify-content-between align-items-center pt-3" style={{ direction: 'rtl' }}>
          <div>
            <h3 className="m-0 text-xl">Elisheva Oyerbach</h3>
            <div className="video-metadata flex align-items-center gap-2 text-gray-300 mt-2" style={{ fontSize: '0.9rem' }}>
              <i className="pi pi-calendar"></i>
              <span>יום שישי, 2 במאי 2025</span>
              <i className="pi pi-clock ml-2"></i>
              <span>00:46</span>
            </div>
          </div>
          <div>
            <Menu model={menuItems} popup ref={menu} />
            {menuButton}
          </div>
        </div>
      </Card>
      
      {/* Floating Badge */}
      <div className="absolute" style={{ top: '10px', right: '10px' }}>
        <Badge value="פרטיות" severity="warning" style={{ fontWeight: 'bold', direction: 'rtl' }} />
      </div>
    </div>
  );
};

export default GetSecurity;