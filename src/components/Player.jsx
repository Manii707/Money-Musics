import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';

const Player = ({ currentSong, songs, onPlaySong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    // If a new song is selected and we want it to auto-play
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Playback error:", e));
      }
    }
  }, [currentSong]);

  const togglePlay = () => {
    if (!currentSong && songs.length > 0) {
      onPlaySong(songs[0]);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(current);
      setDuration(dur);
      setProgress((current / dur) * 100);
    }
  };

  const handleProgressClick = (e) => {
    if (audioRef.current && duration) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - bounds.left) / bounds.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const handleVolumeClick = (e) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - bounds.left) / bounds.width));
      setVolume(percent);
      audioRef.current.volume = percent;
    }
  };

  const handleEnded = () => {
    playNext();
  };

  const playNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    onPlaySong(songs[nextIndex]);
  };

  const playPrev = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    onPlaySong(songs[prevIndex]);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="now-playing-bar">
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadedMetadata={handleTimeUpdate}
      />
      
      <div className="player-left">
        {currentSong ? (
          <>
            <img src={currentSong.coverUrl} alt="Cover" className="now-playing-cover" />
            <div className="now-playing-info">
              <div className="now-playing-title">{currentSong.title}</div>
              <div className="now-playing-artist">{currentSong.artist}</div>
            </div>
          </>
        ) : (
          <div className="now-playing-info">
            <div className="now-playing-title">No song playing</div>
          </div>
        )}
      </div>
      
      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn"><Shuffle size={20} /></button>
          <button className="control-btn" onClick={playPrev}><SkipBack size={20} fill="currentColor" /></button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }}/>}
          </button>
          <button className="control-btn" onClick={playNext}><SkipForward size={20} fill="currentColor" /></button>
          <button className="control-btn"><Repeat size={20} /></button>
        </div>
        
        <div className="playback-bar">
          <span>{formatTime(currentTime)}</span>
          <div className="progress-container" onClick={handleProgressClick}>
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            <div className="progress-handle" style={{ left: `${progress}%` }}></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="player-right">
        <Volume2 size={20} color="var(--text-subdued)" />
        <div className="volume-bar" onClick={handleVolumeClick}>
          <div className="volume-progress" style={{ width: `${volume * 100}%` }}></div>
          <div className="volume-handle" style={{ left: `${volume * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Player;
