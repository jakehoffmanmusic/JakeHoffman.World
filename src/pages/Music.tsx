import { useApp, AudioTrack } from '../App';
import '../styles/Pages.css';

// Import Assets
import ref01 from '../assets/music/01 Reflection.wav';
import ref02 from '../assets/music/02 Sunrise.wav';
import ref03 from '../assets/music/03 In Zee Ocean.wav';
import ref04 from '../assets/music/04 Ghosts of the Past.wav';
import ref05 from '../assets/music/05 Rain.wav';
import ref06 from '../assets/music/06 Didn\'t Like Me Back.wav';
import ref07 from '../assets/music/07 Let It Grow.wav';
import ref08 from '../assets/music/08 In My Life & On My Mind.wav';
import ref09 from '../assets/music/09 This is a Test.wav';
import ref10 from '../assets/music/10 Blood Oath Final.wav';
import refCover from '../assets/music/REFLECTION (Cover Art).png';

import ep1_01 from '../assets/music/01.Howls in the Morning.wav';
import ep1_02 from '../assets/music/02.Talking on the Floor.wav';
import ep1_03 from '../assets/music/03.Dirty Laundry.wav';
import ep1Cover from '../assets/music/EP1 Cover.png';

import ep2_01 from '../assets/music/1 Overlook.mp3';
import ep2_02 from '../assets/music/2 Four Years.mp3';
import ep2_03 from '../assets/music/3 Reptiles.mp3';
import ep2Cover from '../assets/music/EP2 Cover.png';

import ptc_01 from '../assets/music/1 Voices In My Head.wav';
import ptc_02 from '../assets/music/2 Loves Got Me Locked.wav';
import ptc_03 from '../assets/music/3 Sorrow.wav';
import ptc_04 from '../assets/music/4 When We Were Kids.wav';
import ptc_05 from '../assets/music/5 Park This Car.wav';
import ptcCover from '../assets/music/Park This Car Cover.png';

import s_barcar from '../assets/music/Bar:Car.wav';
import s_barcar_c from '../assets/music/Bar:Car Cover copy.png';
import s_clean from '../assets/music/Clean Us, O\' Flame.wav';
import s_clean_c from '../assets/music/Clean Us, O’ Flame (Cover) copy.png';
import s_cocoon from '../assets/music/Cocoon.wav';
import s_cocoon_c from '../assets/music/Cocoon Cover Art copy.png';
import s_coffee from '../assets/music/Coffee Drinking Freeloading Pot-Head.wav';
import s_coffee_c from '../assets/music/Coffee Drinking Freeloading Pot-Head.png';
import s_drugs from '../assets/music/Everybodys on Drugs.wav';
import s_drugs_c from '../assets/music/Everybody\'s On Drugs album conver copy.png';
import s_icry from '../assets/music/I Cry.wav';
import s_icry_c from '../assets/music/I Cry (Album Cover) copy.png';
import s_trouble from '../assets/music/Trouble With Everything.wav';
import s_trouble_c from '../assets/music/Trouble w: Everything.png';
import s_tomorrow from '../assets/music/Who Do You Think You\'ll Be Tomorrow.wav';
import s_tomorrow_c from '../assets/music/Who Do You Think You’ll Be Tomorrow (Cover) copy.png';

const Music = () => {
  const { playTrack, currentTrack, isPlaying } = useApp();

  const releases = [
    {
      id: 'park-this-car',
      title: 'Park This Car',
      type: 'EP',
      cover: ptcCover,
      tracks: [
        { id: 'ptc1', title: 'Voices In My Head', file: ptc_01, releaseId: 'park-this-car' },
        { id: 'ptc2', title: 'Loves Got Me Locked', file: ptc_02, releaseId: 'park-this-car' },
        { id: 'ptc3', title: 'Sorrow', file: ptc_03, releaseId: 'park-this-car' },
        { id: 'ptc4', title: 'When We Were Kids', file: ptc_04, releaseId: 'park-this-car' },
        { id: 'ptc5', title: 'Park This Car', file: ptc_05, releaseId: 'park-this-car' },
      ]
    },
    {
      id: 'reflection',
      title: 'Reflection',
      type: 'ALBUM',
      cover: refCover,
      tracks: [
        { id: 'ref1', title: 'Reflection', file: ref01, releaseId: 'reflection' },
        { id: 'ref2', title: 'Sunrise', file: ref02, releaseId: 'reflection' },
        { id: 'ref3', title: 'In Zee Ocean', file: ref03, releaseId: 'reflection' },
        { id: 'ref4', title: 'Ghosts of the Past', file: ref04, releaseId: 'reflection' },
        { id: 'ref5', title: 'Rain', file: ref05, releaseId: 'reflection' },
        { id: 'ref6', title: "Didn't Like Me Back", file: ref06, releaseId: 'reflection' },
        { id: 'ref7', title: 'Let It Grow', file: ref07, releaseId: 'reflection' },
        { id: 'ref8', title: 'In My Life & On My Mind', file: ref08, releaseId: 'reflection' },
        { id: 'ref9', title: 'This is a Test', file: ref09, releaseId: 'reflection' },
        { id: 'ref10', title: 'Blood Oath', file: ref10, releaseId: 'reflection' },
      ]
    },
    {
      id: 'hoffman-ep2',
      title: 'Hoffman EPII',
      type: 'EP',
      cover: ep2Cover,
      tracks: [
        { id: 'ep2-1', title: 'Overlook', file: ep2_01, releaseId: 'hoffman-ep2' },
        { id: 'ep2-2', title: 'Four Years', file: ep2_02, releaseId: 'hoffman-ep2' },
        { id: 'ep2-3', title: 'Reptiles', file: ep2_03, releaseId: 'hoffman-ep2' },
      ]
    },
    {
      id: 'hoffman-ep',
      title: 'Hoffman EP',
      type: 'EP',
      cover: ep1Cover,
      tracks: [
        { id: 'ep1-1', title: 'Howls in the Morning', file: ep1_01, releaseId: 'hoffman-ep' },
        { id: 'ep1-2', title: 'Talking on the Floor', file: ep1_02, releaseId: 'hoffman-ep' },
        { id: 'ep1-3', title: 'Dirty Laundry', file: ep1_03, releaseId: 'hoffman-ep' },
      ]
    }
  ];

  const singles = [
    { id: 's1', title: 'Bar:Car', file: s_barcar, cover: s_barcar_c },
    { id: 's2', title: "Clean Us, O' Flame", file: s_clean, cover: s_clean_c },
    { id: 's3', title: 'Cocoon', file: s_cocoon, cover: s_cocoon_c },
    { id: 's4', title: 'Coffee Drinking Freeloading Pot-Head', file: s_coffee, cover: s_coffee_c },
    { id: 's5', title: 'Everybodys on Drugs', file: s_drugs, cover: s_drugs_c },
    { id: 's6', title: 'I Cry', file: s_icry, cover: s_icry_c },
    { id: 's7', title: 'Trouble With Everything', file: s_trouble, cover: s_trouble_c },
    { id: 's8', title: "Who Do You Think You'll Be Tomorrow", file: s_tomorrow, cover: s_tomorrow_c },
  ];

  return (
    <div className="music-page-container smaller">
      {/* ALBUMS & EPS */}
      <div className="releases-section">
        {releases.map(release => (
          <div key={release.id} className="release-block">
            <div className="release-header">
              <div className="release-cover-wrapper">
                <img src={release.cover} alt={release.title} />
              </div>
              <div className="release-info">
                <span className="release-type">{release.type}</span>
                <h2 className="release-title-heading">{release.title}</h2>
              </div>
            </div>
            <div className="tracklist">
              {release.tracks.map((track, index) => (
                <div 
                  key={track.id} 
                  className={`track-item ${currentTrack?.id === track.id ? 'active' : ''}`}
                  onClick={() => playTrack(track, release.tracks)}
                >
                  <span className="track-num">{index + 1}</span>
                  <span className="track-title-text">{track.title}</span>
                  {currentTrack?.id === track.id && isPlaying && <span className="playing-indicator">●</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* SINGLES SECTION */}
      <div className="singles-section">
        <h2 className="section-label">Singles</h2>
        <div className="singles-grid">
          {singles.map(single => {
            const track: AudioTrack = { id: single.id, title: single.title, file: single.file, releaseId: 'singles' };
            return (
              <div 
                key={single.id} 
                className={`single-card ${currentTrack?.id === single.id ? 'active' : ''}`}
                onClick={() => playTrack(track, [track])}
              >
                <div className="single-cover">
                  <img src={single.cover} alt={single.title} />
                  <div className="single-play-overlay">▶</div>
                </div>
                <p className="single-title">{single.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Music;
