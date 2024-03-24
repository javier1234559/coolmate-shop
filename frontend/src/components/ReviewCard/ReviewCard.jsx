import PropTypes from 'prop-types';
import './ReviewCard.css';
import RatingStars from '../RatingStars/RatingStars';

function ReviewCard({ rating, productType, userName, comment, reviewDate }) {
  return (
    <div className="review-card">
      <RatingStars value={4.5} />
      <p className="product-type">{productType}</p>
      <p className="user-name">{userName}</p>
      <p className="comment">{comment}</p>
      <p className="review-date">{reviewDate}</p>
    </div>
  );
}

ReviewCard.propTypes = {
  rating: PropTypes.number.isRequired,
  productType: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
};

export default ReviewCard;
