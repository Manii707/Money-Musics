import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Music, X } from 'lucide-react';

const Sidebar = ({ playlists, activePlaylistId, setActivePlaylistId, isOpen, setIsOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      <div className="logo" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music size={32} />
          <span>Money Musics</span>
        </div>
        <button className="mobile-close-btn" onClick={() => setIsOpen(false)}>
          <X size={24} />
        </button>
      </div>
      
      <div className="nav-links">
        <a href="#" className="nav-link active">
          <Home size={24} />
          <span>Home</span>
        </a>
        <a href="#" className="nav-link">
          <Search size={24} />
          <span>Search</span>
        </a>
        <a href="#" className="nav-link">
          <Library size={24} />
          <span>Your Library</span>
        </a>
      </div>
      
      <div className="nav-links" style={{ marginTop: '16px' }}>
        <a href="#" className="nav-link">
          <PlusSquare size={24} />
          <span>Create Playlist</span>
        </a>
        <a href="#" className="nav-link">
          <Heart size={24} style={{ color: '#b3b3b3' }} />
          <span>Liked Songs</span>
        </a>
      </div>
      
      <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '8px 24px' }}></div>
      
      <div className="playlists">
        <h3>Playlists</h3>
        {playlists.map(playlist => (
          <div 
            key={playlist.id} 
            className={`playlist-item ${activePlaylistId === playlist.id ? 'active' : ''}`}
            onClick={() => {
              setActivePlaylistId(playlist.id);
              setIsOpen(false);
            }}
            style={{ 
              color: activePlaylistId === playlist.id ? 'var(--text-base)' : 'var(--text-subdued)',
              fontWeight: activePlaylistId === playlist.id ? '700' : '500'
            }}
          >
            {playlist.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
