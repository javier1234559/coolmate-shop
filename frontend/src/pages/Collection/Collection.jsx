import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProduct from '~/components/CardProduct/CardProduct';
import './Collection.css';
import collectionApi from '~/services/collectionApi';

function Collection() {
  const { slug } = useParams();
  const [collection, setCollections] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    const fetchCollection = async () => {
      try {
        const response = await collectionApi.getCollectionBySlug(slug);
        console.log(response?.data);
        setCollections(response?.data);
      } catch (error) {
        console.log('Failed to fetch products: ', error);
      } finally {
        setisLoading(false);
      }
    };

    fetchCollection();
  }, [slug]);

  return (
    <>
      <div className="content-container container">
        <h1 className="content-title">Bộ sưu tập : {collection?.title} </h1>
        <p className="content-title"> {collection?.description} </p>
        <div className="collection_thumbnail">
          <img src={collection?.thumbnail_image} alt={collection?.title} />
        </div>
        <div className="product-list">{isLoading ? <Skeleton /> : collection?.products?.map((product) => <CardProduct key={product?.id} product={product} />)}</div>
      </div>
    </>
  );
}

export default Collection;
