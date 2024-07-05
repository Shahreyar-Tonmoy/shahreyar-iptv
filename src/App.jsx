import React from 'react';
import Player from './Player';
import './App.css';

function App() {
  const streamUrl = 'http://homeip.biz/GaziTV/tracks-v1a1/mono.m3u8?token=86c916cd19cbcbbadf96f286b04657e6';

  return (
    <div className="App">
      <h1>M3U8 Player</h1>
      <Player src={streamUrl} />
    </div>
  );
}

export default App;





