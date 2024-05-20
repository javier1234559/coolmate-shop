import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DetailProduct.css';
import Button from '~/components/Button/Button';
import ReviewProduct from '~/components/ReviewProduct/ReviewProduct';
import RatingStars from '~/components/RatingStars/RatingStars';
import productApi from '~/services/productApi';
import Skeleton from '~/components/Skeleton/Skeleton';
import { useDispatch } from 'react-redux';
import { addToCart, toggleCart } from '~/redux/cartSlice';

function DetailProduct() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorTagClick = (name) => {
    setSelectedColor(name);
  };

  const handleSizeTagClick = (name) => {
    setSelectedSize(name);
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

  const saveProductToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        product: product,
        image: product?.media[0]?.media_url,
        color: selectedColor,
        size: selectedSize,
        quantity: quantity,
      })
    );
    dispatch(toggleCart());
  };

  useEffect(() => {
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

    const fetchProductDetail = async () => {
      try {
        const response = await productApi.getProductDetailBySlug(slug);
        const detail_product = response.data;
        setProduct(detail_product);
      } catch (error) {
        console.log('Failed to fetch products: ', error);
      }
    };

    Promise.all([fetchProductDetail(), fetchReviewProduct()])
      .then(() => setisLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setisLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    if (product?.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
    if (product?.colorSizes && product.colorSizes.length > 0 && product.colorSizes[0].color) {
      setSelectedColor(product.colorSizes[0].color.name);
    }
    if (product?.colorSizes && product.colorSizes.length > 0 && product.colorSizes[0].size) {
      setSelectedSize(product.colorSizes[0].size.name);
    }
  }, [product]);

  if (isLoading) {
    return (
      <div className="full-screen-skeleton">
        <Skeleton />
      </div>
    );
  }

  const uniqueColors = product?.colorSizes?.reduce((acc, tag) => {
    if (!acc.find((color) => color.name === tag.color.name)) {
      acc.push(tag.color);
    }
    return acc;
  }, []);

  const uniqueSizes = product.colorSizes.reduce((acc, tag) => {
    if (!acc.find((size) => size.name === tag.size.name)) {
      acc.push(tag.size);
    }
    return acc;
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
          <div key={selectedImage} className={`big-image `}>
            <img src={selectedImage || product?.media[0]?.media_url} alt="Selected Product" />
          </div>
        </div>
        <div className="product-details">
          <h2 className="product-title">{product?.name}</h2>
          <RatingStars value={4.5} />
          <div className="price">
            <h1>{product?.price}đ</h1>
          </div>
          <div className="color-tags">
            <h2 className="color-name">
              Màu sắc : <span>{selectedColor}</span>
            </h2>
            <div>
              {uniqueColors.map((tag) => (
                <span key={tag?.id} style={{ backgroundColor: tag?.hex_code }} className={`color-tag ${selectedColor === tag?.id ? 'selected' : ''}`} onClick={() => handleColorTagClick(tag?.name)}></span>
              ))}
            </div>
          </div>
          <div className="color-tags">
            <h2 className="color-name">
              Kích thước : <span>{selectedSize}</span>
            </h2>
            <div>
              {uniqueSizes?.map((tag, index) => {
                return (
                  <div key={index} className={`color-tag ${selectedSize === tag?.name ? 'selected' : ''}`} onClick={() => handleSizeTagClick(tag?.name)}>
                    {tag?.name}
                  </div>
                );
              })}
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
            <Button className="add-to-cart-btn" variant="black" onClick={saveProductToCart}>
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
