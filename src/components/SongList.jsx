import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const SongDuration = ({ url }) => {
  const [duration, setDuration] = useState("--:--");

  useEffect(() => {
    let audio = new Audio(url);
    audio.preload = "metadata";

    const handleLoadedMetadata = () => {
      const time = audio.duration;
      if (!isNaN(time) && time !== Infinity) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio = null;
    };
  }, [url]);

  return <span>{duration}</span>;
};

const SongList = ({ songs, currentSong, isPlaying, onPlaySong }) => {
  return (
    <div className="song-list-container">
      <div className="song-list-header">
        <div style={{ textAlign: 'center' }}>#</div>
        <div>Title</div>
        <div className="song-album">Album</div>
        <div style={{ textAlign: 'right', paddingRight: '16px' }}>Duration</div>
      </div>
      
      <div className="song-list">
        {songs.map((song, index) => {
          const isThisSongPlaying = currentSong?.id === song.id;
          
          return (
            <div 
              key={song.id} 
              className={`song-row ${isThisSongPlaying ? 'active' : ''}`}
              onClick={() => onPlaySong(song)}
              onDoubleClick={() => onPlaySong(song)}
            >
              <div className="song-index">
                {isThisSongPlaying && isPlaying ? (
                  <div className="equalizer">
                    <div className="eq-bar"></div>
                    <div className="eq-bar"></div>
                    <div className="eq-bar"></div>
                    <div className="eq-bar"></div>
                  </div>
                ) : (
                  <>
                    <span className="song-index-number">{index + 1}</span>
                    <Play className="song-play-icon" size={16} fill="currentColor" />
                  </>
                )}
              </div>
              
              <div className="song-info">
                <img src={song.coverUrl} alt={song.title} className="song-cover" loading="lazy" />
                <div className="song-title-group">
                  <span className="song-title">{song.title}</span>
                  <span className="song-artist">{song.artist}</span>
                </div>
              </div>
              
              <div className="song-album">
                {song.album}
              </div>
              
              <div className="song-duration" style={{ textAlign: 'right', paddingRight: '16px' }}>
                <SongDuration url={song.url} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SongList;
