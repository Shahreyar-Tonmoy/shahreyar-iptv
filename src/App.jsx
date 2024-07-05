import React from 'react';
import Player from './Player';
import './App.css'; // Import Tailwind CSS
import channels from "../public/m3u8.json"


function App() {


  return (
    <div className="App">
      <h1 className="text-2xl font-bold my-5 uppercase">Shahreyar IPTV</h1>
      <Player src={channels[0].url} channels={channels} className="video-player" />
    </div>
  );
}

export default App;
