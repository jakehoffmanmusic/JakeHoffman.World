import { useState } from 'react';
import { useApp } from '../App';
import '../styles/Pages.css';
import reflectionCover from '../assets/music/REFLECTION (Cover Art).png';
import officialStoreImg from '../assets/official-store.png';
import buyDirectImg from '../assets/buy-direct.png';
import blueGuyImg from '../assets/blue-guy.jpg';
import redSkeletonImg from '../assets/red-skeleton.jpg';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const Shop = () => {
  const { addToCart, removeFromCart, cartItems } = useApp();
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  // Products Library: Add new product objects here.
  const products: Product[] = [
    {
      id: 1,
      name: "Blue Sky, Blue Mountain, Blue Guy",
      price: 45.00,
      image: blueGuyImg,
      description: '5.5"x8.5" pen drawing on sketch paper.'
    },
    {
      id: 2,
      name: "Red Skeleton",
      price: 35.00,
      image: redSkeletonImg,
      description: '5.5"x8.5" pen drawing on sketch paper.'
    }
  ];

  const isInCart = (id: number) => cartItems.some((item: any) => item.id === id);

  const handleCartAction = (product: Product) => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="container shop-container-wide">
      <div className="shop-header">
        <img src={officialStoreImg} alt="Official Store" className="handwritten-header-main" />
        <img src={buyDirectImg} alt="Buy Direct from Artist" className="handwritten-header-sub" />
      </div>

      {products.length > 0 ? (
        <div className="shop-grid-small">
          {products.map(product => (
            <div key={product.id} className="product-card-small">
              <Link to={`/product/${product.id}`} className="product-image-container-small">
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-details-small">
                <Link to={`/product/${product.id}`}>
                  <h3>{product.name}</h3>
                </Link>
                <p className="product-price-small">${product.price.toFixed(2)}</p>
                
                <button 
                  className={`buy-now-btn-small ${isInCart(product.id) ? 'added' : ''}`} 
                  onClick={() => handleCartAction(product)}
                  onMouseEnter={() => setHoveredProductId(product.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  {isInCart(product.id) 
                    ? (hoveredProductId === product.id ? 'Click to Remove' : 'Added') 
                    : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="coming-soon" style={{textAlign: 'center', padding: '5rem 0', opacity: 0.5, fontFamily: 'var(--font-wild)', textTransform: 'uppercase', letterSpacing: '0.1em'}}>Coming soon</div>
      )}
    </div>
  );
};

export default Shop;
