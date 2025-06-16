import React from "react";

const VideoPlayerInAnyleys = ({ videoUrl }) => {
  return (
    <div
      style={{
        backgroundColor: "#383c4d",     
        borderRadius: "5px",
        padding: "1rem",
        width: "100%",
        height: "390px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#ffffff"                
      }}
    >
      <video
        width="100%"
        height="300"
        controls
        style={{
          borderRadius: "8px",
          backgroundColor: "#2b2f3f"    
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        הדפדפן שלך לא תומך בהצגת וידאו.
      </video>
    </div>
  );
};

export default VideoPlayerInAnyleys;
