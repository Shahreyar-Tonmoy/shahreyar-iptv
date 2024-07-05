/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

function Player({ src, channels }) {
  const videoRef = useRef(null);
  const [isLive, setIsLive] = useState(false); // State to track live status
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [hlsInstance, setHlsInstance] = useState(null); // State to hold the Hls.js instance

  useEffect(() => {
    const video = videoRef.current;

    const initializePlayer = () => {
      if (Hls.isSupported()) {
        if (hlsInstance) {
          hlsInstance.destroy();
        }
        let hls = new Hls();
        hls.loadSource(channels[currentChannelIndex].url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
          setIsLive(true); // Set live status to true when stream starts
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });

        setHlsInstance(hls);

        return () => {
          hls.destroy();
          setIsLive(false); // Set live status to false when stream ends
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = channels[currentChannelIndex].url;
        video.addEventListener('loadedmetadata', () => {
          video.play();
          setIsLive(true); // Set live status to true when stream starts
        });
      } else {
        console.error('HLS.js is not supported and video format is not supported');
      }
    };

    // Call the initialization function
    initializePlayer();

    // Ensure continuous playback
    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
      setIsLive(true); // Set live status to true when stream restarts
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [channels, currentChannelIndex]);

  const handlePrevious = () => {
    const newIndex = (currentChannelIndex - 1 + channels.length) % channels.length;
    setCurrentChannelIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentChannelIndex + 1) % channels.length;
    setCurrentChannelIndex(newIndex);
  };

  return (
    <div className="player relative">
      <video ref={videoRef} controls autoPlay muted className="video-player" />
      {isLive && (
        <div className="live-indicator absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg font-bold text-sm animate-pulse">
          Live
        </div>
      )}
      <div className="channel-info absolute bottom-2 left-2 text-white">
        <span className="bg-black bg-opacity-50 px-2 py-1 rounded-lg">{channels[currentChannelIndex].name}</span>
      </div>
      <div className="controls absolute top-2 right-2 flex space-x-2  opacity-0 transition-opacity duration-300">
        <button onClick={handlePrevious} className="bg-gray-800 text-white px-2 py-1 rounded-lg">
          Previous
        </button>
        <button onClick={handleNext} className="bg-gray-800 text-white px-2 py-1 rounded-lg">
          Next
        </button>
      </div>
      <style >{`
        .player:hover .controls {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default Player;
