import Carousel from '~/components/Carousel/Carousel';
import Button from '~/components/Button/Button';
import CardProduct from '~/components/CardProduct/CardProduct';
import './Home.css';

function Home() {
  const products = [
    {
      id: 1,
      imageSrc: 'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2023/23CMAW.QD004.z.14_47.jpg',
      stars: 4.5,
      isNew: true,
      colorTags: [
        { id: 1, hexcolor: '#882e46', colorName: 'Purple' },
        { id: 2, hexcolor: '#36729c', colorName: 'Blue' },
      ],
      productName: 'Quần Dài Nam Chạy Bộ Fast & Free',
      price: '199.000',
      discountedPrice: '99.000',
    },
    {
      id: 2,
      imageSrc: 'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2023/23CMAW.QD004.z.14_47.jpg',
      stars: 4.5,
      isNew: true,
      colorTags: [
        { id: 1, hexcolor: '#882e46', colorName: 'Purple' },
        { id: 2, hexcolor: '#36729c', colorName: 'Blue' },
      ],
      productName: 'Quần Dài Nam Chạy Bộ Fast & Free',
      price: '199.000',
      discountedPrice: '99.000',
    },
    {
      id: 3,
      imageSrc: 'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2023/23CMAW.QD004.z.14_47.jpg',
      stars: 4.5,
      isNew: true,
      colorTags: [
        { id: 1, hexcolor: '#882e46', colorName: 'Purple' },
        { id: 2, hexcolor: '#36729c', colorName: 'Blue' },
      ],
      productName: 'Quần Dài Nam Chạy Bộ Fast & Free',
      price: '199.000',
      discountedPrice: '99.000',
    },
    {
      id: 4,
      imageSrc: 'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2023/23CMAW.QD004.z.14_47.jpg',
      stars: 4.5,
      isNew: true,
      colorTags: [
        { id: 1, hexcolor: '#882e46', colorName: 'Purple' },
        { id: 2, hexcolor: '#36729c', colorName: 'Blue' },
      ],
      productName: 'Quần Dài Nam Chạy Bộ Fast & Free',
      price: '199.000',
      discountedPrice: '99.000',
    },
    {
      id: 5,
      imageSrc: 'https://media.coolmate.me/cdn-cgi/image/width=672,height=990,quality=85,format=auto/uploads/November2023/23CMAW.QD004.z.14_47.jpg',
      stars: 4.5,
      isNew: true,
      colorTags: [
        { id: 1, hexcolor: '#882e46', colorName: 'Purple' },
        { id: 2, hexcolor: '#36729c', colorName: 'Blue' },
      ],
      productName: 'Quần Dài Nam Chạy Bộ Fast & Free',
      price: '199.000',
      discountedPrice: '99.000',
    },
  ];

  return (
    <>
      <div>
        <Carousel />
      </div>
      <div className="content-container container">
        <h1 className="content-title">Bạn đang muốn tìm gì?</h1>
        <div>
          <Button variant="black">Sản phẩm mới nhất</Button>
          <Button variant="white" className="ml-4">
            Sản phẩm bán chạy
          </Button>
        </div>
        <div className="product-list">
          {products.map((product) => (
            <CardProduct key={product.id} imageSrc={product.imageSrc} stars={product.stars} isNew={product.isNew} colorTags={product.colorTags} productName={product.productName} price={product.price} discountedPrice={product.discountedPrice} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
