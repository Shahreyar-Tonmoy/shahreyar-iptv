/* eslint-disable react/prop-types */
import  { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function Player({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(error => {
          console.error('Error attempting to play:', error);
        });
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.play().catch(error => {
        console.error('Error attempting to play:', error);
      });
    }
  }, [src]);

  return (
    <div className="player">
      <video ref={videoRef} controls autoPlay className="video-player" />
    </div>
  );
}

export default Player;
