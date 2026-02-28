import { useApp } from '../App';
import '../styles/Pages.css';
import reflectionCover from '../assets/ReflectionCover.png';
import iCryCover from '../assets/ICrySingle.png';
import cocoonCover from '../assets/CocoonSingle.png';
import hoffmanEPCover from '../assets/HoffmanEP1.png';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const Shop = () => {
  const { addToCart, cartItems } = useApp();

  const products: Product[] = [
    {
      id: 1,
      name: 'Reflection Vinyl',
      price: 1.00,
      image: reflectionCover,
      description: 'Limited edition vinyl pressing of Reflection.'
    },
    {
      id: 2,
      name: 'I Cry Single',
      price: 1.00,
      image: iCryCover,
      description: 'Official release of the single "I Cry".'
    },
    {
      id: 3,
      name: 'Cocoon Single',
      price: 1.00,
      image: cocoonCover,
      description: 'Official release of the single "Cocoon".'
    },
    {
      id: 4,
      name: 'Hoffman EP1',
      price: 1.00,
      image: hoffmanEPCover,
      description: 'The debut EP from Jake Hoffman.'
    }
  ];

  const isInCart = (id: number) => cartItems.some((item: any) => item.id === id);

  return (
    <div className="container shop-container-wide">
      <div className="shop-header">
        <h2>Official Store</h2>
        <p>Direct from the artist to you.</p>
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
        <div className="coming-soon" style={{textAlign: 'center', padding: '5rem 0', opacity: 0.5}}>Coming soon</div>
      )}
    </div>
  );
};

export default Shop;
