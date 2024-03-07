import baseApi from "./baseapi";

const productApi = {
  getProduct() {
    const page = 1;
    const pageSize = 10;
    const url = `/products?page=${page}&pageSize=${pageSize}`
    return baseApi.get(url);
  }
}

export default productApi;