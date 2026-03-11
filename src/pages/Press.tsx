import '../styles/Pages.css';

const Press = () => {
  return (
    <div className="container press-grid-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div className="press-grid">
        
        {/* TOP LEFT: Text */}
        <div className="press-square text-square">
          <div className="square-content">
            <p>
              Hi, welcome to my press page. Thank you for being here. The video to your right is a song I wrote called "Priceless" from a show we played in 2025. Its about my relationship with life's limited nature. 
            </p>
            <p>
              I focus my writing on relationships: relationships between people, groups, species, between the inside and outside world, and the many relationships which exist within each and every one of us. To explore more, visit the "Works" section of this site.
            </p>
          </div>
        </div>

        {/* TOP RIGHT: Video (Priceless) */}
        <div className="press-square video-square">
          <iframe
            src="https://www.youtube.com/embed/yl-1vSMoeNw"
            title="Priceless - Live 2025"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* BOTTOM LEFT: Video (Second Video) */}
        <div className="press-square video-square">
          <iframe
            src="https://www.youtube.com/embed/7hZecSbF1_E"
            title="Press Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* BOTTOM RIGHT: Text (Natural State) */}
        <div className="press-square text-square">
          <div className="square-content">
            <p>
              <strong>"Natural State"</strong> is an immersive concert series I am producing. It is an evolving format which gives an audience the opportunity to intuitively explore music first hand and understand the pieces at play. 
            </p>
            <p>
              The first experience will take place on October 17th in New York City at The DiMenna Center for Classical Music.
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .press-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-top: 2rem;
          align-items: center;
        }
        .press-square {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .video-square {
          aspect-ratio: 16 / 9;
          width: 100%;
        }
        .text-square {
          padding: 3rem;
          text-align: left;
        }
        .square-content {
          font-family: var(--font-sans);
          line-height: 1.8;
          font-size: 1.15rem;
          font-weight: 600;
          color: #000;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .video-square iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
        @media (max-width: 900px) {
          .press-grid {
            grid-template-columns: 1fr;
          }
          .press-square {
            aspect-ratio: auto;
            min-height: 300px;
          }
          .video-square {
            aspect-ratio: 16 / 9;
          }
        }
      `}</style>
    </div>
  );
};

export default Press;
