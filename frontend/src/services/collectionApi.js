import baseApi from "./baseapi";

const collectionApi = {
  getTopCollection() {
    const page = 1;
    const pageSize = 5;
    const url = `/collections?page=${page}&pageSize=${pageSize}`
    return baseApi.get(url);
  },
  getCollectionBySlug(slug) {
    const url = `/collections/slug/${slug}`;
    return baseApi.get(url);
  },
}

export default collectionApi;