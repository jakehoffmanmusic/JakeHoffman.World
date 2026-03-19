import { useParams, Link } from 'react-router-dom';
import { useApp } from '../App';
import { useState } from 'react';
import '../styles/Pages.css';
import blueGuyImg from '../assets/blue-guy.jpg';
import redSkeletonImg from '../assets/red-skeleton.jpg';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart, removeFromCart, cartItems } = useApp();
  const [hovered, setHovered] = useState(false);

  // Reusing products list - In a real app this would come from context or a shared file
  const products = [
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

  const product = products.find(p => p.id === parseInt(productId || "0"));

  if (!product) {
    return (
      <div className="container" style={{textAlign: 'center', padding: '5rem 0'}}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="ticket-button-black" style={{marginTop: '2rem'}}>Back to Shop</Link>
      </div>
    );
  }

  const isInCart = (id: number) => cartItems.some((item: any) => item.id === id);

  const handleCartAction = () => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="container product-detail-page">
      <Link to="/shop" className="back-link" style={{marginBottom: '2rem', display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.6}}>← Back to Shop</Link>
      
      <div className="product-detail-layout-container">
        <div className="product-detail-layout">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="product-detail-info" style={{ textAlign: 'center' }}>
            <h1 style={{fontFamily: 'var(--font-wild)', fontSize: '2rem', textTransform: 'uppercase', marginBottom: '1rem'}}>{product.name}</h1>
            <p className="detail-price" style={{fontFamily: 'var(--font-mono)', fontSize: '1.5rem', marginBottom: '2rem'}}>${product.price.toFixed(2)}</p>
            
            <div className="detail-description" style={{fontFamily: 'var(--font-sans)', lineHeight: '1.6', marginBottom: '3rem'}}>
              <h3 className="section-label" style={{textAlign: 'center', marginBottom: '1rem'}}>Description</h3>
              <p>{product.description}</p>
            </div>

            <button 
              className={`buy-now-btn-small ${isInCart(product.id) ? 'added' : ''}`} 
              style={{padding: '1.2rem', fontSize: '0.9rem', width: '100%', maxWidth: '300px'}}
              onClick={handleCartAction}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {isInCart(product.id) 
                ? (hovered ? 'Click to Remove' : 'Added to Cart') 
                : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .product-detail-page {
          padding-bottom: 8rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .product-detail-layout-container {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .product-detail-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
        }
        .product-detail-image {
          background: #000;
          aspect-ratio: 1/1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
        }
        .product-detail-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .product-detail-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
