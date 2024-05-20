import Carousel from '~/components/Carousel/Carousel';
import Button from '~/components/Button/Button';
import CardProduct from '~/components/CardProduct/CardProduct';
import './Home.css';
import { useState, useEffect } from 'react';
import productApi from '~/services/productApi';
import collectionApi from '~/services/collectionApi';
import Skeleton from '~/components/Skeleton/Skeleton';
import { carousel_images } from '~/mockdata';
import { PRODUCT_LIST_HEADING } from '~/constants';

function Home() {
  const [carouselImages, setCarouselImages] = useState(carousel_images);
  const [products, setProducts] = useState([]);
  const [listCollection, setListCollection] = useState([]);
  const [heading, setHeading] = useState(PRODUCT_LIST_HEADING.LATEST);
  const [isLoading, setisLoading] = useState(false);

  const fetchTopCollections = async () => {
    try {
      const response = await collectionApi.getTopCollection();
      const images = response?.data?.map((collection) => ({
        id: collection.id,
        image: collection.thumbnail_image,
        slug: collection.slug,
      }));
      console.log('Top ', response?.data);
      setListCollection(response?.data);
      setCarouselImages(images);
    } catch (error) {
      console.log('Failed to fetch products: ', error);
    }
  };

  const fetchLastestProducts = async () => {
    try {
      const response = await productApi.getProduct();
      console.log(response.data);
      setProducts(response?.data);
      setHeading(PRODUCT_LIST_HEADING.LATEST);
    } catch (error) {
      console.log('Failed to fetch products: ', error);
    }
  };

  const fetchBestSellingProducts = async () => {
    try {
      const response = await productApi.getBestSellerProduct();
      console.log(response?.data);
      setProducts(response?.data);
      setHeading(PRODUCT_LIST_HEADING.BEST_SELLER);
    } catch (error) {
      console.log('Failed to fetch products: ', error);
    }
  };

  useEffect(() => {
    Promise.all([fetchTopCollections(), fetchLastestProducts()])
      .then(() => setisLoading(false))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setisLoading(false);
      });
  }, [isLoading]);

  return (
    <>
      <div>
        <Carousel images={carouselImages} />
      </div>
      <div className="content-container container">
        <h1 className="content-title">Bạn đang muốn tìm gì?</h1>
        <div>
          <Button variant="black" onClick={fetchLastestProducts}>
            {PRODUCT_LIST_HEADING.LATEST}
          </Button>
          <Button variant="white" onClick={fetchBestSellingProducts} className="ml-4">
            {PRODUCT_LIST_HEADING.BEST_SELLER}
          </Button>
        </div>
        <h1 className="heading-home">{heading}</h1>
        <div className="product-list">{isLoading ? <Skeleton /> : products?.map((product) => <CardProduct key={product?.id} product={product} />)}</div>
      </div>
      {listCollection?.map((collection) => (
        <div key={collection.id} className="collection-home">
          <h1 className="heading-home">{collection.title}</h1>
          <div className="collection_thumbnail">
            <img src={collection?.thumbnail_image} alt={collection?.title} />
          </div>
          <div className="content-container ">
            <div className="product-list">{isLoading ? <Skeleton /> : collection?.products?.map((product) => <CardProduct key={product?.id} product={product} />)}</div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;
