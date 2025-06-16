
import React from 'react';

const VideoPlayer = ({ filename }) => {
  return (
    <video width="640" height="360" controls>
      <source src={`http://localhost:8080/videos/1746042985280-176516495.mp4`} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
   
 
 