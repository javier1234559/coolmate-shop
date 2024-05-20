import PropTypes from 'prop-types';
import { useState } from 'react';
import './ReviewProduct.css';
import ReviewCard from '~/components/ReviewCard/ReviewCard';
import RatingStars from '../RatingStars/RatingStars';

function ReviewProduct({ totalRating, reviews }) {
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortByDate, setSortByDate] = useState('recent');

  // Filter reviews based on selected rating
  const filteredReviews = selectedRating ? reviews.filter((review) => review.rating == selectedRating) : reviews;

  // Sort reviews based on selected sorting option
  const sortedReviews = sortByDate === 'recent' ? filteredReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : filteredReviews.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return (
    <div className="review-product">
      <div className="review-product-left">
        <div className="big-rating">
          <h2>{totalRating}</h2>
          <RatingStars value={totalRating} />
        </div>
      </div>
      <div className="review-product-right">
        <select className="review-product-filter" value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
          <option value="">Filter by Rating</option>
          {Array.from({ length: 11 }).map((_, index) => (
            <option key={index * 0.5} value={index * 0.5}>
              {index * 0.5}
            </option>
          ))}
        </select>
        <select className="review-product-filter" value={sortByDate} onChange={(e) => setSortByDate(e.target.value)}>
          <option value="recent">Sort by Recent</option>
          <option value="oldest">Sort by Oldest</option>
        </select>

        {/* List of review cards */}
        {sortedReviews.map((review) => (
          <ReviewCard key={review.id} rating={review.rating} userName={review?.user?.name || 'Anonymous'} comment={review?.comment || 'Quần mặc rất thoải mái, chất liệu vải thoáng mát, mặc rất vừa với size Coolmate tư vấn. Coolmate đóng gói kỹ càng, lịch sự và chuyên nghiệp. Ủng hộ Coolmate lâu dài 👍'} reviewDate={review?.created_at || '09.03.2024'} />
        ))}
      </div>
    </div>
  );
}

ReviewProduct.propTypes = {
  totalRating: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      // Add other review properties here
    })
  ).isRequired,
};

export default ReviewProduct;
