import baseApi from "./baseapi";

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
  }

}

export default productApi;