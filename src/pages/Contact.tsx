import '../styles/Pages.css';
import emailImg from '../assets/handwritten-email.png';
import spotifyImg from '../assets/handwritten-spotify.png';
import youtubeImg from '../assets/handwritten-youtube.png';

const Contact = () => {
  const email = 'Jakehoffman.world@gmail.com';

  return (
    <div className="container">
      <div className="contact-container">
        {/* Handwritten Email Image Link */}
        <div className="handwritten-email-wrapper">
          <a href={`mailto:${email}`}>
            <img src={emailImg} alt="Email Jake Hoffman" className="contact-handwritten-img" />
          </a>
        </div>

        <div style={{marginTop: '4rem'}}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '3rem', alignItems: 'center'}}>
            {/* Handwritten Spotify Link */}
            <a href="https://open.spotify.com/artist/6RBseELBMfSd1jHcK0dQbH?si=KXdGBVi4SCKRQUFnByefqQ" target="_blank" rel="noopener noreferrer">
              <img src={spotifyImg} alt="Spotify" className="social-handwritten-img" />
            </a>
            
            {/* Handwritten YouTube Link */}
            <a href="https://www.youtube.com/@JakeHoffmansYouTube" target="_blank" rel="noopener noreferrer">
              <img src={youtubeImg} alt="YouTube" className="social-handwritten-img" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
