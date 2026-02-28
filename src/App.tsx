import { useState, createContext, useContext, ReactNode, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Videos from './pages/Videos';
import Music from './pages/Music';
import Shows from './pages/Shows';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import logo from './assets/logo.png';
import worksIcon from './assets/works.png';
import showsIcon from './assets/shows.png';
import shopIcon from './assets/shop.png';
import contactIcon from './assets/contact.png';
import rhinoLogo from './assets/rhino-stencil-black.png';
import './styles/App.css';

// Context for global state
interface Product { id: number; name: string; price: number; image: string; description: string; }
export interface AudioTrack { id: string; title: string; file: string; releaseId: string; }

interface AppContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  // Audio Persistent Player
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  playlist: AudioTrack[];
  playTrack: (track: AudioTrack, releasePlaylist: AudioTrack[]) => void;
  stopAudio: () => void;
  toggleAudio: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

function Intro({ onFinish }: { onFinish: () => void }) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      setTimeout(onFinish, 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);
  return (
    <div className={`intro-container ${!active ? 'fade-out' : ''}`}>
      <div className="intro-rhino-wrapper">
        <img src={rhinoLogo} className="intro-rhino" alt="Rhino" />
      </div>
    </div>
  );
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [playlist, setPlaylist] = useState<AudioTrack[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasStoppedManually = useRef(false);

  const addToCart = (product: Product) => setCartItems(prev => [...prev, product]);
  const removeFromCart = (productId: number) => setCartItems(prev => prev.filter(item => item.id !== productId));
  const clearCart = () => setCartItems([]);

  const playTrack = (track: AudioTrack, releasePlaylist: AudioTrack[]) => {
    wasStoppedManually.current = false;
    setPlaylist(releasePlaylist);
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const stopAudio = () => {
    wasStoppedManually.current = true;
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Strip the source entirely
      audioRef.current.load();   // Force the browser to dump the audio buffer
    }
    setCurrentTrack(null);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (!currentTrack || wasStoppedManually.current) return;
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    if (currentIndex < playlist.length - 1) {
      setCurrentTrack(playlist[currentIndex + 1]);
    } else {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (currentTrack && audioRef.current && !wasStoppedManually.current) {
      audioRef.current.src = currentTrack.file;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);

  return (
    <AppContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, currentTrack, isPlaying, playlist, playTrack, stopAudio, toggleAudio }}>
      {children}
      <audio ref={audioRef} onEnded={playNext} />
    </AppContext.Provider>
  );
};

function AppContent() {
  const [introState, setIntroState] = useState<'playing' | 'finished'>('playing');
  const { cartItems, currentTrack, isPlaying, toggleAudio, stopAudio } = useApp();

  if (introState === 'playing') {
    return <Intro onFinish={() => setIntroState('finished')} />;
  }

  return (
    <Router>
      <div className="app-fade-in">
        {currentTrack && (
          <div className={`persistent-player ${currentTrack ? 'active' : ''}`}>
            <div className="player-track-info">
              <span className="now-playing-label">Now Playing</span>
              <span className="track-name">{currentTrack.title}</span>
            </div>
            <div className="player-controls">
              <button onClick={toggleAudio} className="play-pause-btn">
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </button>
              <button onClick={stopAudio} className="close-player-btn">✕</button>
            </div>
          </div>
        )}

        <header>
          <div className="container header-container">
            <div className="logo-container">
              <NavLink to="/">
                <img src={logo} alt="Jake Hoffman" />
              </NavLink>
            </div>
            <NavLink to="/cart" className="global-cart-link">
              <div className="cart-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </div>
            </NavLink>
          </div>
        </header>

        <nav>
          <div className="container">
            <ul>
              <li className="nav-dropdown">
                <NavLink to="/videos" className={({ isActive }) => (isActive || window.location.pathname === '/music') ? 'active' : ''}>
                  <img src={worksIcon} alt="Works" className="nav-icon" />
                </NavLink>
                <div className="dropdown-content">
                  <NavLink to="/videos">VIDEOS</NavLink>
                  <NavLink to="/music">MUSIC</NavLink>
                </div>
              </li>
              <li><NavLink to="/shows"><img src={showsIcon} alt="Shows" className="nav-icon" /></NavLink></li>
              <li><NavLink to="/shop"><img src={shopIcon} alt="Shop" className="nav-icon" /></NavLink></li>
              <li><NavLink to="/contact"><img src={contactIcon} alt="Contact" className="nav-icon" /></NavLink></li>
            </ul>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={null} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/music" element={<Music />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
