import { useState, createContext, useContext, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Works from './pages/Works';
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

// Cart Context for global state
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

function Intro({ onFinish }: { onFinish: () => void }) {
  const [active, setActive] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(false);
      setTimeout(onFinish, 1000); // Wait for fade out
    }, 3000); // Back to 3s to allow for the glow
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

// Separate component to use useEffect properly
import { useEffect } from 'react';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

function AppContent() {
  const [introState, setIntroState] = useState<'playing' | 'finished'>('playing');
  const { cartItems } = useCart();

  if (introState === 'playing') {
    return <Intro onFinish={() => setIntroState('finished')} />;
  }

  return (
    <Router>
      <div className="app-fade-in">
        <header>
          <div className="container header-container">
            <div className="logo-container">
              <NavLink to="/">
                <img src={logo} alt="Jake Hoffman" />
              </NavLink>
            </div>
            {/* Global Cart Icon */}
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
              <li>
                <NavLink to="/works" className={({ isActive }) => isActive ? 'active' : ''}>
                  <img src={worksIcon} alt="Works" className="nav-icon" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/shows" className={({ isActive }) => isActive ? 'active' : ''}>
                  <img src={showsIcon} alt="Shows" className="nav-icon" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/shop" className={({ isActive }) => isActive ? 'active' : ''}>
                  <img src={shopIcon} alt="Shop" className="nav-icon" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
                  <img src={contactIcon} alt="Contact" className="nav-icon" />
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={null} />
            <Route path="/works" element={<Works />} />
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
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
