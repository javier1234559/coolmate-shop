
export const products = [
  {
    seller_id: 1,
    name: 'Áo Thun Nam Chạy Bộ Graphic Photic Zone',
    brand: 'Coolmate',
    description: 'Description for T-Shirt',
    rating: 4.5,
    numReviews: 10,
    price: 189.000,
    category_id: 1,
  },
  {
    seller_id: 2,
    name: 'Pants 1',
    brand: 'Brand B',
    description: 'Description for Pants 1',
    rating: 4.0,
    numReviews: 8,
    price: 49.99,
    category_id: 1,
  },
]

export const productMedia = [
  {
    media_type: 'image',
    media_url: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/24CMAW.AT011.1_91.jpg"
  },
  {
    media_type: 'image',
    media_url: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/photic3d.4.jpg"
  }
]

export const productColorSizes = [
  {
    quantity: 100,
  },
  {
    quantity: 100,
  }
]

export const sizes = [
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },
  { name: 'XL' },
  { name: 'XXL' },
  { name: 'XXXL' },
]

export const colors = [
  { name: 'Blue', hex_code: '#498ab7' },
  { name: 'White', hex_code: '#f1f1f1' }
]

export const categories = [
  { name: 'T-Shirts', description: 'T-Shirts category' },
  { name: 'Pants', description: 'Pants category' },
]

export const collections = [
  {
    product_ids : [1, 2],
    title: 'Summer Collection',
    description: 'Summer Collection description',
    slug: 'summer-collection',
    is_active: true,
    thumbnail_image: 'https://media.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/February2024/mceclip6_85.png'
  },
  {
    product_ids : [1],
    title: 'Tet Collection',
    description: 'Tet Collection description',
    slug: 'tet-collection',
    is_active: true,
    thumbnail_image: 'https://mcdn.coolmate.me/image/January2024/mceclip1_83.jpg'
  },
]