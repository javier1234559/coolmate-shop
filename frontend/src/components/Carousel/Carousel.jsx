import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Carousel.css';

const carousel_images = [
  {
    id: 1,
    image: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/February2024/UT_JOGGER.png',
  },
  {
    id: 2,
    image: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/January2024/Banner-Basic_copytet.jpg',
  },
  {
    id: 3,
    image: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/September2023/Ready-2-wear-banner19_84.jpg',
  },
];

export default function Carousel() {
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
