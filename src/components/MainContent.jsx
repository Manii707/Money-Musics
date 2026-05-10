import React from 'react';
import { ChevronLeft, ChevronRight, Play, User, Menu } from 'lucide-react';
import SongList from './SongList';

const MainContent = ({ playlist, songs, currentSong, isPlaying, onPlaySong, toggleMobileMenu }) => {
  return (
    <div className="main-view" id="main-view">
      <div className="header">
        <div className="header-arrows">
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <Menu size={20} />
          </button>
          <button className="arrow-btn">
            <ChevronLeft size={24} />
          </button>
          <button className="arrow-btn">
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="user-profile">
          <div className="avatar">
            <User size={16} />
          </div>
          <span>Money</span>
        </div>
      </div>
      
      <div className="banner" style={{
        backgroundImage: `linear-gradient(transparent 0%, rgba(0,0,0,0.8) 100%), url(${playlist.coverUrl})`
      }}>
        <div className="banner-content">
          <p>Public Playlist</p>
          <h1>{playlist.title}</h1>
          <p>{playlist.description} • {songs.length} songs</p>
        </div>
      </div>
      
      <div className="action-bar">
        <button className="play-button-large" onClick={() => songs.length > 0 && onPlaySong(songs[0])}>
          <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
        </button>
      </div>
      
      <SongList 
        songs={songs} 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onPlaySong={onPlaySong} 
      />
    </div>
  );
};

export default MainContent;
