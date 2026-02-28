import { useApp } from '../App';
import '../styles/Pages.css';
import cocoonAudio from '../assets/Cocoon.wav';
import reflectionAudio from '../assets/Reflection.wav';
import oceanAudio from '../assets/InZeeOcean.wav';
import rainAudio from '../assets/Rain.wav';
import iCryAudio from '../assets/ICry.wav';

const Music = () => {
  const { playTrack, currentTrack, isPlaying } = useApp();

  const audio = [
    { id: 'icry', title: 'I Cry', file: iCryAudio },
    { id: 'cocoon', title: 'Cocoon', file: cocoonAudio },
    { id: 'reflection', title: 'Reflection', file: reflectionAudio },
    { id: 'ocean', title: 'In Zee Ocean', file: oceanAudio },
    { id: 'rain', title: 'Rain', file: rainAudio },
  ];

  return (
    <div className="works-page-v2">
      <section className="playlist-section">
        <h3 className="section-label" style={{textAlign: 'center', marginBottom: '3rem'}}>Music Library</h3>
        <div className="audio-list-container">
          {audio.map(track => (
            <div 
              key={track.id} 
              className={`audio-row ${currentTrack?.id === track.id ? 'active' : ''}`}
              onClick={() => playTrack(track)}
              style={{cursor: 'pointer'}}
            >
              <div className="audio-info-left">
                <span className="audio-status-icon">
                  {currentTrack?.id === track.id && isPlaying ? '●' : '▶'}
                </span>
                <span className="audio-title">{track.title}</span>
              </div>
              <span className="audio-duration-placeholder">Listen</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Music;
