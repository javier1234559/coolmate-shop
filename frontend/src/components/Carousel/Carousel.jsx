import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/pagination';
import './Carousel.css';

export default function Carousel({ images: carousel_images }) {
  return (
    <>
      <Swiper
        direction={'vertical'}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        modules={[Pagination]}
        className="mySwiper">
        {carousel_images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.image} alt={image.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
