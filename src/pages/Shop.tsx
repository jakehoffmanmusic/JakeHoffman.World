import { useCart } from '../App';
import '../styles/Pages.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const Shop = () => {
  const { addToCart, cartItems } = useCart();

  // FUTURE UPLOADS: Add new product objects to this array.
  // Format: { id: number, name: 'Title', price: 1.00, image: placeholderVariable, description: 'Desc' }
  const products: Product[] = [
    /*
    {
      id: 1,
      name: 'Reflection Vinyl',
      price: 1.00,
      image: reflectionCover,
      description: 'Limited edition vinyl pressing of Reflection.'
    },
    ...
    */
  ];

  const isInCart = (id: number) => cartItems.some(item => item.id === id);

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
