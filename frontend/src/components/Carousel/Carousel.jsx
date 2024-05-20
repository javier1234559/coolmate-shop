import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import 'swiper/css/pagination';
import './Carousel.css';

export default function Carousel({ images: carousel_images }) {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        {carousel_images.map((image) => (
          <SwiperSlide key={image.id} onClick={() => navigate(`/collection/${image.slug}`)}>
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
