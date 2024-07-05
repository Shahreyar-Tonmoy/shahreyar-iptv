/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function Player({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
    }

    // Set controlsList to "nodownload" to hide the progress bar
    video.controlsList = "nodownload";

  }, [src]);

  return (
    <div className="player">
      <video ref={videoRef} controls autoPlay muted className="video-player" />
    </div>
  );
}

export default Player;
