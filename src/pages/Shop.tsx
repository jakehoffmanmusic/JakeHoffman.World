import { useApp } from '../App';
import '../styles/Pages.css';
import reflectionCover from '../assets/music/REFLECTION (Cover Art).png';
import officialStoreImg from '../assets/official-store.png';
import buyDirectImg from '../assets/buy-direct.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const Shop = () => {
  const { addToCart, cartItems } = useApp();

  // Test Product
  const products: Product[] = [
    {
      id: 1,
      name: 'Reflection Vinyl',
      price: 1.00,
      image: reflectionCover,
      description: 'Test product for store verification.'
    }
  ];

  const isInCart = (id: number) => cartItems.some((item: any) => item.id === id);

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
              <div className="product-image-container-small">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-details-small">
                <h3>{product.name}</h3>
                <p className="product-price-small">${product.price.toFixed(2)}</p>
                
                <button 
                  className={`buy-now-btn-small ${isInCart(product.id) ? 'added' : ''}`} 
                  onClick={() => !isInCart(product.id) && addToCart(product)}
                  disabled={isInCart(product.id)}
                >
                  {isInCart(product.id) ? 'Added' : 'Add to Cart'}
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
