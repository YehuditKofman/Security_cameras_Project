// import React, { useState } from 'react';

// const VideoUploader = () => {
//   const [videoSrcs, setVideoSrcs] = useState([]);

//   const handleVideoChange = (event) => {
//     const files = Array.from(event.target.files);
//     const videoUrls = files.map(file => URL.createObjectURL(file));
//     setVideoSrcs(videoUrls);
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" multiple onChange={handleVideoChange} />
//       {videoSrcs.map((src, index) => (
//         <video key={index} width="600" controls>
//           <source src={src} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ))}
//     </div>
//   );
// };

// export default VideoUploader;


// import { useState, useEffect } from 'react';
// import { Play, Pause, SkipForward, SkipBack, Maximize2, Shield, Calendar, Clock, Menu } from 'lucide-react';

// // Premium Security Camera Card Component
// export default function PremiumSecurityCard() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
  
//   // Update time every minute
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
    
//     return () => clearInterval(timer);
//   }, []);
  
//   // Format date for display
//   const formattedDate = new Intl.DateTimeFormat('he-IL', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   }).format(currentTime);
  
//   // Format time for display
//   const formattedTime = new Intl.DateTimeFormat('he-IL', {
//     hour: '2-digit',
//     minute: '2-digit'
//   }).format(currentTime);
  
//   const togglePlayback = () => {
//     setIsPlaying(!isPlaying);
//   };
  
//   return (
//     <div className="flex justify-center items-center w-full h-full bg-gray-100 p-8">
//       <div className="w-full max-w-lg bg-gray-900 rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-102 hover:shadow-xl">
//         {/* Premium badge */}
//         <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10">
//           <Shield size={14} />
//           <span>פרימיום</span>
//         </div>
        
//         {/* Video container */}
//         <div className="relative w-full aspect-video bg-black">
//           {/* Video placeholder */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             {isPlaying ? (
//               <video 
//                 className="w-full h-full object-cover"
//                 autoPlay 
//                 muted 
//                 loop
//               >
//                 <source src="/api/placeholder/640/360" type="video/mp4" />
//                 הדפדפן שלך אינו תומך בתגית וידאו.
//               </video>
//             ) : (
//               <div className="w-full h-full bg-gray-900 flex items-center justify-center">
//                 <img src="/api/placeholder/640/360" alt="Security Camera Feed" className="w-full h-full object-cover opacity-80" />
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-30 transition-all duration-300" onClick={togglePlayback}>
//                     <Play size={32} className="text-white ml-1" />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Control overlay */}
//           <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300">
//                 <SkipBack size={16} className="text-white" />
//               </button>
              
//               <button 
//                 className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300"
//                 onClick={togglePlayback}
//               >
//                 {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-1" />}
//               </button>
              
//               <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300">
//                 <SkipForward size={16} className="text-white" />
//               </button>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300">
//                 <Maximize2 size={16} className="text-white" />
//               </button>
//             </div>
//           </div>
          
//           {/* Progress bar */}
//           <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
//             <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: '35%' }}></div>
//           </div>
//         </div>
        
//         {/* Card content - smaller and less prominent */}
//         <div className="p-3 bg-gray-900 bg-opacity-95 text-white">
//           <div className="flex items-center justify-between mb-2">
//             <h3 className="text-sm font-medium rtl:text-right">מצלמת אבטחה - כניסה ראשית</h3>
//             <button className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300">
//               <Menu size={12} className="text-gray-300" />
//             </button>
//           </div>
          
//           <div className="flex items-center gap-3 mb-2 text-xs text-gray-300">
//             <div className="flex items-center gap-1">
//               <Calendar size={12} />
//               <span className="rtl:text-right">{formattedDate}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <Clock size={12} />
//               <span className="rtl:text-right">{formattedTime}</span>
//             </div>
//           </div>
          
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-1">
//               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//               <span className="text-xs text-gray-300 rtl:text-right">שידור חי</span>
//             </div>
            
//             <button className="px-2 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded text-xs font-medium rtl:text-right hover:from-blue-700 hover:to-blue-900 transition-all duration-300">
//               צפה בהקלטות
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';

// PrimeReact CSS - Make sure to import these in your main file or component
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

const VideoCard = () => {
  const [playing, setPlaying] = useState(false);
  const menu = React.useRef(null);

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

  const togglePlay = () => {
    setPlaying(!playing);
  };

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
        <div className="video-player-container relative" style={{ backgroundColor: '#a0a0a0', aspectRatio: '16/9' }}>
          {/* Play Button Overlay */}
          <div className="flex justify-content-center align-items-center absolute" style={{ inset: 0 }}>
            <Button 
              icon={playing ? "pi pi-pause" : "pi pi-play"} 
              className="p-button-rounded p-button-outlined"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.3)', 
                border: '2px solid white',
                width: '60px',
                height: '60px'
              }}
              onClick={togglePlay}
              aria-label={playing ? "השהה" : "הפעל"}
            />
          </div>
          
          {/* Video Controls */}
          <div className="video-controls absolute bottom-0 left-0 right-0 flex justify-content-between p-2">
            <div className="flex gap-2">
              <Button icon="pi pi-step-backward" className="p-button-rounded p-button-text text-white" aria-label="קודם" />
              <Button 
                icon={playing ? "pi pi-pause" : "pi pi-play"} 
                className="p-button-rounded p-button-text text-white" 
                onClick={togglePlay}
                aria-label={playing ? "השהה" : "הפעל"}
              />
              <Button icon="pi pi-step-forward" className="p-button-rounded p-button-text text-white" aria-label="הבא" />
            </div>
            <Button icon="pi pi-window-maximize" className="p-button-rounded p-button-text text-white" aria-label="מסך מלא" />
          </div>
          
          {/* Progress Bar */}
          <div className="progress-bar absolute bottom-0 left-0 right-0" style={{ height: '4px', background: 'linear-gradient(90deg, #3B82F6 30%, #818CF8 80%, #C084FC 100%)' }}></div>
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

export default VideoCard;