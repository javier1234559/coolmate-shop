class ProductDTO {
  id: string;
  imageSrc: string;
  stars: number;
  isNew: boolean;
  colorTags: { id: number; hexcolor: string; colorName: string }[];
  productName: string;
  price: string;
  discountedPrice: string;
}

class GetProductsResponseDTO {
  products: ProductDTO[];
  total: number;

  constructor(products: ProductDTO[], total: number) {
    this.products = products;
    this.total = total;
  }
}
