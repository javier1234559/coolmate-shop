import baseApi from './baseApi';

const productApi = {
  getProduct() {
    const page = 1;
    const pageSize = 10;
    const url = `/products?page=${page}&pageSize=${pageSize}`
    return baseApi.get(url);
  },
  getLastestProdudt() {
    const url = `/products/latest`;
    return baseApi.get(url);
  },
  getBestSellerProduct() {
    const url = `/products/best-seller`;
    return baseApi.get(url);
  },
  getProductDetailBySlug(slug) {
    const url = `/products/slug/${slug}`;
    return baseApi.get(url);
  },
  getReviewProduct(slug) {
    const url = `/products/${slug}/reviews`;
    return baseApi.get(url);
  },
  createReviewProduct(slug, data) {
    const url = `/products/${slug}/reviews`;
    return baseApi.post(url, data);
  },
  searchProduct(keyword) {
    const url = `/products?keyword=${keyword}`;
    return baseApi.get(url);
  }

}

export default productApi;