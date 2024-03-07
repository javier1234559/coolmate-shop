import { useState } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'phosphor-react';
import './CardProduct.css';

const CardProduct = ({ imageSrc, stars, isNew, colorTags, productName, price, discountedPrice }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  // const [currentImageSrc, setCurrentImageSrc] = useState(defaultImageSrc);

  const handleColorTagClick = (tag) => {
    setSelectedColor(tag.id);
    // You may want to load or switch to the corresponding image based on the selected color.
    // For now, let's assume each color tag has an associated image source in the 'images' object.
    // setCurrentImageSrc(images[tag.id]);
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <img src={imageSrc} alt={productName} />
        <div className="star-badge">
          {stars}
          <Star size={16} weight="fill" />
        </div>
        {isNew && <div className="new-badge">New</div>}
      </div>
      <div className="details">
        <div className="color-tags">
          {/* {colorTags?.map((tag) => (
            <span key={tag.id}
              style={{ backgroundColor: tag.hexcolor }} 
              className={`color-tag ${selectedColor === tag.id ? 'selected' : ''}`}
              onClick={() => handleColorTagClick(tag)}
              >
            </span>
          ))} */}
        </div>
        <div className="product-name">{productName}</div>
        <div className="price">
          <span className="discounted-price">{discountedPrice}</span>
          <span className="original-price">{price}</span>
        </div>
      </div>
    </div>
  );
};

CardProduct.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  isNew: PropTypes.bool.isRequired,
  colorTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      hexcolor: PropTypes.string.isRequired,
      colorName: PropTypes.string.isRequired,
    })
  ),
  productName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discountedPrice: PropTypes.number.isRequired,
};

export default CardProduct;
