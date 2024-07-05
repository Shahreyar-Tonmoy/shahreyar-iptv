import React from 'react';
import Player from './Player';
import './App.css'; // Import Tailwind CSS

function App() {
  const streamUrl = 'https://homeip.biz/GaziTV/tracks-v1a1/mono.m3u8';

  return (
    <div className="App">
      <h1 className="text-2xl font-bold my-5 uppercase">Shahreyar IPTV</h1>
      <Player src={streamUrl} className="video-player" />
    </div>
  );
}

export default App;
