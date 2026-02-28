import { useState } from 'react';
import { useApp } from '../App';
import '../styles/Pages.css';

const Videos = () => {
  const { stopAudio } = useApp();
  const videos = [
    { id: 'n421r-1ao7o', title: "Jake Hoffman Live @ Arlene's Grocery 10/12/25", youtubeId: 'n421r-1ao7o' },
    { id: 'UGCO4XJBw8c', title: 'Voices In My Head (Official Music Video)', youtubeId: 'UGCO4XJBw8c' },
    { id: '5LpSVjQFzO4', title: 'Howls in the Morning (Official Music Video)', youtubeId: '5LpSVjQFzO4' },
    { id: 'FtEe3wyxfYQ', title: "Didn't Like Me Back (Official Music Video)", youtubeId: 'FtEe3wyxfYQ' },
    { id: 'MCFallokdvo', title: 'Let It Grow Live @ Purgatory', youtubeId: 'MCFallokdvo' },
    { id: 'aH90TBVCYGM', title: "Jake's Road Kitchen: Road Taco", youtubeId: 'aH90TBVCYGM' },
    { id: 'GB3l9gjvHgA', title: '"Dirty Laundry" Live w/ Kumbaya', youtubeId: 'GB3l9gjvHgA' },
  ];

  const [activeVideo, setActiveVideo] = useState(videos[0]);

  const handleVideoSelect = (video: any) => {
    setActiveVideo(video);
    stopAudio(); // Stop persistent music when a video is selected
  };

  return (
    <div className="works-page-v2">
      <section className="featured-video-section">
        <div className="video-player-container">
          <iframe
            key={activeVideo.id}
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?enablejsapi=1`}
            title={activeVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => {
              // This is a simple hook to stop music when iframe loads/plays
              // Real detection of 'play' requires YouTube API but stopAudio() on select covers most cases
            }}
          ></iframe>
        </div>
      </section>

      <section className="playlist-section">
        <h3 className="section-label">Video Library</h3>
        <div className="video-grid">
          {videos.map(video => (
            <button 
              key={video.id} 
              className={`video-thumb-btn ${activeVideo.id === video.id ? 'active' : ''}`}
              onClick={() => handleVideoSelect(video)}
            >
              <div className="thumb-wrapper">
                <img src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`} alt={video.title} />
                <div className="play-overlay">▶</div>
              </div>
              <p className="thumb-title">{video.title}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Videos;
