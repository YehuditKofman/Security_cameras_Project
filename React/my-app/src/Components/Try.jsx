import React, { useState } from 'react';

const VideoUploader = () => {
  const [videoSrcs, setVideoSrcs] = useState([]);

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const videoUrls = files.map(file => URL.createObjectURL(file));
    setVideoSrcs(videoUrls);
  };

  return (
    <div>
      <input type="file" accept="video/*" multiple onChange={handleVideoChange} />
      {videoSrcs.map((src, index) => (
        <video key={index} width="600" controls>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ))}
    </div>
  );
};

export default VideoUploader;
