import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailProduct.css';
import Button from '~/components/Button/Button';
import ReviewProduct from '~/components/ReviewProduct/ReviewProduct';
import RatingStars from '~/components/RatingStars/RatingStars';
import productApi from '~/services/productApi';
import Skeleton from '~/components/Skeleton/Skeleton';

function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorTagClick = (tag) => {
    setSelectedColor(tag?.id);
  };

  const handleSizeTagClick = (tag) => {
    console.log(tag?.name);
    setSelectedSize(tag?.name);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const fetchProductDetail = async () => {
    try {
      const response = await productApi.getProductDetailBySlug(slug);
      const detail_product = response.data;
      setProduct(detail_product);
    } catch (error) {
      console.log('Failed to fetch products: ', error);
    }
  };

  const fetchReviewProduct = async () => {
    try {
      const response = await productApi.getReviewProduct(slug);
      const review_product = response.data;
      console.log(review_product);
      setReviews(review_product);
    } catch (error) {
      console.log('Failed to fetch reviews: ', error);
    }
  };

  useEffect(() => {
    Promise.all([fetchProductDetail(), fetchReviewProduct()])
      .then(() => setisLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setisLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="full-screen-skeleton">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="container col">
      <div className="product-detail">
        <div className="image-preview">
          <div className="small-images">
            {product?.media?.map((media) => (
              <img key={media.id} src={media.media_url} alt={`Product Preview ${media.media_type}`} className={`small-image ${selectedImage === media.media_url ? 'selected' : ''}`} onClick={() => handleImageClick(media.media_url)} />
            ))}
          </div>
          <div key={selectedImage} className={`big-image `}>
            <img src={selectedImage || product?.media[0]?.media_url} alt="Selected Product" />
          </div>
        </div>
        <div className="product-details">
          <h2 className="product-title">{product?.name}</h2>
          {/* <div className="rating">
            {Array.from({ length: Math.floor(product?.rating) }).map((_, index) => (
              <span key={index}>
                <Star weight="fill" size={20} />
              </span>
            ))}
            {product?.rating % 1 !== 0 && (
              <span>
                <StarHalf weight="fill" size={20} />
              </span>
            )}
            {Array.from({ length: 5 - Math.ceil(product?.rating) }).map((_, index) => (
              <span key={Math.floor(product?.rating) + index} className="empty-star">
                <Star size={20} />
              </span>
            ))}
          </div> */}
          <RatingStars value={4.5} />
          <div className="price">
            <h1>{product?.price}.000đ</h1>
          </div>
          <div className="color-tags">
            <h2 className="color-name">
              Màu sắc : <span>{product?.colorSizes[0]?.color?.name}</span>
            </h2>
            <div>
              {product?.colorSizes?.map((tag) => (
                <span key={tag?.id} style={{ backgroundColor: tag?.color?.hex_code }} className={`color-tag ${selectedColor === tag?.id ? 'selected' : ''}`} onClick={() => handleColorTagClick(tag)}></span>
              ))}
            </div>
          </div>
          <div className="color-tags">
            <h2 className="color-name">
              Kích thước : <span>{product?.colorSizes[0]?.size?.name}</span>
            </h2>
            <div>
              {product?.colorSizes?.map((tag, index) => (
                <div key={index} className={`color-tag ${selectedSize === tag?.size?.name ? 'selected' : ''}`} onClick={() => handleSizeTagClick(tag?.size)}>
                  {tag?.size?.name}
                </div>
              ))}
            </div>
          </div>
          <div className="row">
            <div className="quantity-input">
              <div className="quantity-controls">
                <button type="button" className="decrease" onClick={decreaseQuantity}>
                  -
                </button>
                <input type="number" id="quantity" name="quantity" min="1" max="99" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
                <button type="button" className="increase" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>
            <Button className="add-to-cart-btn" variant="black">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="product-description" dangerouslySetInnerHTML={{ __html: product?.description }} />
      <div>
        <ReviewProduct totalRating={product?.rating} reviews={reviews} />
      </div>
    </div>
  );
}

export default DetailProduct;
