import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailProduct.css';
import { detail_product } from '~/mockdata';

function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(detail_product);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  console.log(slug);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorTagClick = (tag) => {
    setSelectedColor(tag?.id);
  };

  useEffect(() => {
    setProduct(detail_product);
  }, []);

  return (
    <div className="container col">
      <div className="product-detail">
        <div className="image-preview">
          <div className="small-images">
            {product?.media?.map((media) => (
              <img key={media.id} src={media.media_url} alt={`Product Preview ${media.media_type}`} className={`small-image ${selectedImage === media.media_url ? 'selected' : ''}`} onClick={() => handleImageClick(media.media_url)} />
            ))}
          </div>
          <div className="big-image">
            <img src={selectedImage || product?.media[0]?.media_url} alt="Selected Product" />
          </div>
        </div>
        <div className="product-details">
          <h2>{product?.name}</h2>
          <div className="rating">
            {Array.from({ length: Math.floor(product?.rating) }).map((_, index) => (
              <span key={index}>&#9733;</span>
            ))}
            {product?.rating % 1 !== 0 && <span>&#189;</span>}
            {Array.from({ length: 5 - Math.ceil(product?.rating) }).map((_, index) => (
              <span key={Math.floor(product?.rating) + index} className="empty-star">
                &#9733;
              </span>
            ))}
          </div>
          <div className="color-tags">
            {product?.colorSizes?.map((tag) => (
              <span key={tag?.id} style={{ backgroundColor: tag?.color?.hex_code }} className={`color-tag ${selectedColor === tag?.id ? 'selected' : ''}`} onClick={() => handleColorTagClick(tag)}></span>
            ))}
          </div>
          <div className="size-options">
            {product?.colorSizes?.size?.map((size, index) => (
              <div key={index} className="size-option">
                {size?.name}
              </div>
            ))}
          </div>
          <div className="quantity-input">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" id="quantity" name="quantity" min="1" />
          </div>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
      <div className="product-description" dangerouslySetInnerHTML={{ __html: product?.description }} />
    </div>
  );
}

export default DetailProduct;
