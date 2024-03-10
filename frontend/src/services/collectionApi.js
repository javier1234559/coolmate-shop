import baseApi from "./baseapi";

const collectionApi = {
  getTopCollection() {
    const page = 1;
    const pageSize = 10;
    const url = `/collections?page=${page}&pageSize=${pageSize}`
    return baseApi.get(url);
  },

}

export default collectionApi;