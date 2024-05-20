import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardProduct from '~/components/CardProduct/CardProduct';
import productApi from '~/services/productApi';

function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keyword = params.get('keyword');

  const [products, setProducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    console.log(keyword);
    setisLoading(true);
    const fetchSearchProduct = async () => {
      try {
        const response = await productApi.searchProduct(keyword);
        console.log(response?.data);
        setProducts(response?.data);
      } catch (error) {
        console.log('Failed to fetch products: ', error);
      } finally {
        setisLoading(false);
      }
    };

    fetchSearchProduct();
  }, [keyword]);

  return (
    <>
      <div className="content-container container">
        <h1 className="content-title">Kết quả tìm kiếm của : {keyword} </h1>
        <div className="product-list">{isLoading ? <Skeleton /> : products?.map((product) => <CardProduct key={product?.id} product={product} />)}</div>
      </div>
    </>
  );
}

export default Search;
