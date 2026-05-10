import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import { songs } from './data/songs';
import { playlists } from './data/playlists';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePlaylistId, setActivePlaylistId] = useState("mass_hits");

  const handlePlaySong = (song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  const activePlaylist = playlists.find(p => p.id === activePlaylistId) || playlists[0];
  const playlistSongs = songs.filter(s => s.playlistId === activePlaylistId);

  return (
    <div className="app-container">
      <Sidebar 
        playlists={playlists} 
        activePlaylistId={activePlaylistId} 
        setActivePlaylistId={setActivePlaylistId} 
      />
      <MainContent 
        playlist={activePlaylist}
        songs={playlistSongs} 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onPlaySong={handlePlaySong} 
      />
      <Player 
        currentSong={currentSong} 
        songs={playlistSongs} 
        onPlaySong={handlePlaySong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
      />
    </div>
  );
}

export default App;
