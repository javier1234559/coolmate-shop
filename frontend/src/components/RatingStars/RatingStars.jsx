import PropTypes from 'prop-types';
import { Star, StarHalf } from 'phosphor-react';
import './RatingStars.css';

function RatingStars({ value }) {
  return (
    <div className="rating">
      {Array.from({ length: Math.floor(value) }).map((_, index) => (
        <span key={index}>
          <Star weight="fill" size={20} />
        </span>
      ))}
      {value % 1 !== 0 && (
        <span>
          <StarHalf weight="fill" size={20} />
        </span>
      )}
      {Array.from({ length: 5 - Math.ceil(value) }).map((_, index) => (
        <span key={Math.floor(value) + index} className="empty-star">
          <Star size={20} />
        </span>
      ))}
    </div>
  );
}

RatingStars.propTypes = {
  value: PropTypes.number.isRequired,
};

export default RatingStars;
