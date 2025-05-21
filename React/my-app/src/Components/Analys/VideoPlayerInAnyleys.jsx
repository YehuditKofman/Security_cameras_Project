import React from "react";

const VideoPlayerInAnyleys = ({ videoUrl }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginTop: "1rem",
        width: "50%", // ← הוספה: חצי רוחב
        marginInline: "auto" // מרכז את הווידאו אם רוצים
      }}
    >
      <video width="100%" height="300" controls style={{ borderRadius: "8px" }}>
        <source src={videoUrl} type="video/mp4" />
        הדפדפן שלך לא תומך בהצגת וידאו.
      </video>
    </div>
  );
};

export default VideoPlayerInAnyleys;
