import { useState, useRef, useEffect } from 'react';
import '../styles/Pages.css';
import cocoonAudio from '../assets/Cocoon.wav';
import reflectionAudio from '../assets/Reflection.wav';
import oceanAudio from '../assets/InZeeOcean.wav';
import rainAudio from '../assets/Rain.wav';
import iCryAudio from '../assets/ICry.wav';

const Works = () => {
  const videos = [
    { id: 'n421r-1ao7o', title: "Jake Hoffman Live @ Arlene's Grocery 10/12/25", youtubeId: 'n421r-1ao7o' },
    { id: 'UGCO4XJBw8c', title: 'Voices In My Head (Official Music Video)', youtubeId: 'UGCO4XJBw8c' },
    { id: '5LpSVjQFzO4', title: 'Howls in the Morning (Official Music Video)', youtubeId: '5LpSVjQFzO4' },
    { id: 'FtEe3wyxfYQ', title: "Didn't Like Me Back (Official Music Video)", youtubeId: 'FtEe3wyxfYQ' },
    { id: 'MCFallokdvo', title: 'Let It Grow Live @ Purgatory', youtubeId: 'MCFallokdvo' },
    { id: 'aH90TBVCYGM', title: "Jake's Road Kitchen: Road Taco", youtubeId: 'aH90TBVCYGM' },
    { id: 'GB3l9gjvHgA', title: '"Dirty Laundry" Live w/ Kumbaya', youtubeId: 'GB3l9gjvHgA' },
  ];

  const audio = [
    { id: 'icry', title: 'I Cry', file: iCryAudio },
    { id: 'cocoon', title: 'Cocoon', file: cocoonAudio },
    { id: 'reflection', title: 'Reflection', file: reflectionAudio },
    { id: 'ocean', title: 'In Zee Ocean', file: oceanAudio },
    { id: 'rain', title: 'Rain', file: rainAudio },
  ];

  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  // Handle YouTube video ending to play next
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange' && data.info === 0) { // 0 means 'ended'
          playNextVideo();
        }
      } catch (e) {
        // Not a JSON message we care about
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [activeVideo]);

  const playNextVideo = () => {
    const currentIndex = videos.findIndex(v => v.id === activeVideo.id);
    const nextIndex = (currentIndex + 1) % videos.length;
    setActiveVideo(videos[nextIndex]);
  };

  const handlePlayAudio = (id: string) => {
    setActiveAudioId(id);
    Object.keys(audioRefs.current).forEach(key => {
      if (key !== id) audioRefs.current[key]?.pause();
    });
  };

  const playNextAudio = (currentId: string) => {
    const currentIndex = audio.findIndex(a => a.id === currentId);
    const nextIndex = (currentIndex + 1) % audio.length;
    const nextTrack = audio[nextIndex];
    
    setActiveAudioId(nextTrack.id);
    const nextAudioEl = audioRefs.current[nextTrack.id];
    if (nextAudioEl) {
      nextAudioEl.currentTime = 0;
      nextAudioEl.play();
    }
  };

  const handleVideoSelect = (video: any) => {
    setActiveVideo(video);
    Object.values(audioRefs.current).forEach(a => a?.pause());
    setActiveAudioId(null);
  };

  return (
    <div className="works-page-v2">
      {/* FEATURED VIDEO SECTION */}
      <section className="featured-video-section">
        <div className="video-player-container">
          <iframe
            key={activeVideo.id}
            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?enablejsapi=1`}
            title={activeVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* VIDEO PLAYLIST SECTION */}
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

      {/* AUDIO LIBRARY SECTION */}
      <section className="playlist-section">
        <h3 className="section-label">Audio Library</h3>
        <div className="audio-list-container">
          {audio.map(track => (
            <div key={track.id} className={`audio-row ${activeAudioId === track.id ? 'active' : ''}`}>
              <span className="audio-title">{track.title}</span>
              <audio 
                ref={el => audioRefs.current[track.id] = el}
                controls 
                onPlay={() => handlePlayAudio(track.id)}
                onEnded={() => playNextAudio(track.id)}
                src={track.file}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Works;
