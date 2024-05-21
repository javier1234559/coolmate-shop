import { useState } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'phosphor-react';
import { Link } from 'react-router-dom';
import './CardProduct.css';

const CardProduct = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  // const [currentImageSrc, setCurrentImageSrc] = useState(defaultImageSrc);

  const handleColorTagClick = (tag) => {
    setSelectedColor(tag.id);
    // You may want to load or switch to the corresponding image based on the selected color.
    // For now, let's assume each color tag has an associated image source in the 'images' object.
    // setCurrentImageSrc(images[tag.id]);
  };

  const uniqueColors = product?.colorSizes?.reduce((acc, tag) => {
    if (!acc.find((color) => color?.name === tag?.color?.name)) {
      acc.push(tag.color);
    }
    return acc;
  }, []);



  return (
    <Link to={`/product/${product?.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
        <div className="image-container">
          <img src={product?.media[0]?.media_url} alt={product?.name} />
          <div className="star-badge">
            {product?.rating}
            <Star size={16} weight="fill" />
          </div>
          {true && <div className="new-badge">{product?.category?.name}</div>}
        </div>
        <div className="details">
          <div className="color-tags">
            {uniqueColors?.map((tag) => (
              <span key={tag?.id} style={{ backgroundColor: tag?.hex_code }} className={`color-tag ${selectedColor === tag?.id ? 'selected' : ''}`} onClick={() => handleColorTagClick(tag)}></span>
            ))}
          </div>
          <div className="product-name">{product?.name}</div>
          <div className="price">
            <span className="discounted-price">{product?.price + product?.price * 0.2}</span>
            <span className="original-price">{product?.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

CardProduct.propTypes = {
  product: PropTypes.object.isRequired,
};
export default CardProduct;
