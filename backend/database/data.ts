
export const categories = [
  {
    icon: `🍟`,
    name: 'T-Shirts',
    description: 'T-Shirts category'
  },
  {
    icon: `🍔`,
    name: 'Pants',
    description: 'Pants category'
  },
]

export const deliveredDetails = [
  { status: "Pending", updateTime: new Date().toISOString() },
  { status: "Ready", updateTime: new Date().toISOString() },
  { status: "On the way", updateTime: new Date().toISOString() },
  { status: "Delivered", updateTime: new Date().toISOString() }
]

export const paymentResults = [
  {
    status: "success",
    payment_type: "Credit Card",
    provider: "Stripe"
  },
  {
    status: "pending",
    payment_type: "PayPal",
    provider: "PayPal"
  },
];

export const colors = [
  { name: "Red", hex_code: "#FF0000" },
  { name: "Green", hex_code: "#00FF00" },
  { name: "Blue", hex_code: "#0000FF" },
  { name: "Yellow", hex_code: "#FFFF00" }
]

export const sizes = [
  { name: 'S' },
  { name: 'M' },
  { name: 'L' },
  { name: 'XL' },
  { name: 'XXL' },
  { name: 'XXXL' },
]

export const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: "+1234567890",
    role: "user",
    avatar_img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/59.jpg",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456",
    phone: "+9876543210",
    role: "admin",
    avatar_img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1237.jpg",
  }
];

export const userAddresses = [
  {
    address: "123 Main St",
    city: "New York",
    district: "Manhattan",
    commune: "Downtown",
    phone: "9876543210",
    user_id: 1
  },
  {
    address: "1999 Main St",
    city: "Hawaii",
    district: "Manhattan",
    commune: "Downtown",
    phone: "9876543210",
    user_id: 2
  },

];


export const userPayments = [
  {
    user_id: 1,
    payment_type: "Credit Card",
    provider: "Visa",
  },
  {
    user_id: 2,
    payment_type: "Credit Card",
    provider: "Visa",
  }
];

export const products = [
  {
    seller_id: 1,
    name: 'Áo Thun Nam Chạy Bộ Graphic Photic Zone',
    brand: 'Coolmate',
    description: 'Description for Áo Thun Nam Chạy Bộ Graphic Photic Zone',
    rating: 4.5,
    slug: 'ao-thun-nam-chay-bo-graphic-photic-zone',
    numReviews: 10,
    price: 189.000,
    category_id: 1,
    is_active: true
  },
  {
    seller_id: 2,
    name: 'Áo Thun Nam Thể Thao V1',
    brand: 'Brand B',
    description: 'Description for Áo Thun Nam Thể Thao V1',
    rating: 4.0,
    slug: 'ao-thun-nam-the-thao-v1',
    numReviews: 8,
    price: 49.99,
    category_id: 1,
    is_active: true
  },
]

export const productMedia = [
  {
    product_id: 1,
    media_type: 'image',
    media_url: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/24CMAW.AT011.1_91.jpg"
  },
  {
    product_id: 2,
    media_type: 'image',
    media_url: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/photic3d.4.jpg"
  }
]

export const productColorSizes = [
  {
    quantity: 100,
    product_id: 1,
    color_id: 1,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 1,
    color_id: 1,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 1,
    color_id: 1,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 1,
    color_id: 1,
    size_id: 4,
  }
  ,
  {
    quantity: 100,
    product_id: 2,
    color_id: 1,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 1,
    size_id: 2,
  }

]


export const collections = [
  {
    product_ids: [1, 2],
    title: 'Summer Collection',
    description: 'Summer Collection description',
    slug: 'summer-collection',
    is_active: true,
    thumbnail_image: 'https://media.coolmate.me/cdn-cgi/image/width=1800,height=1200,quality=80,format=auto/uploads/February2024/mceclip6_85.png'
  },
  {
    product_ids: [1],
    title: 'Tet Collection',
    description: 'Tet Collection description',
    slug: 'tet-collection',
    is_active: true,
    thumbnail_image: 'https://mcdn.coolmate.me/image/January2024/mceclip1_83.jpg'
  },
]


export const carts = [
  {
    user_id: 1,
    totalprice: 250,
    items: [],
  }
]

export const cartItems = [
  {
    cart_id: 1,
    product_id: 1,
    image: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/24CMAW.AT011.1_91.jpg",
    quantity: 2,
  },
  {
    cart_id: 1,
    product_id: 2,
    image: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/photic3d.4.jpg",
    quantity: 1,
  }
];

export const orders = [
  {
    user_id: 1,
    shippingAddress: "123 Main St",
    paymentMethod: "Credit Card",
    deliveryDetail_id: 1,
    paymentResult_id: "1",
    item_ids: [],
    itemsPrice: 200,
    taxPrice: 20,
    shippingPrice: 10,
    totalPrice: 230,
    isPaid: true,
    paidAt: new Date(),
    isDelivered: false,
    deliveredAt: new Date()
  }
]

export const orderItems = [
  {
    order_id: 1,
    image: "product1.jpg",
    quantity: 2,
    product_id: 1,
    created_at: new Date(),
    modified_at: new Date()
  },
];

export const reviews = [
  {
    user_id: 1,
    product_id: 1,
    rating: 4.5,
    comment: "Great product",
  },
  {
    user_id: 2,
    product_id: 2,
    rating: 3.5,
    comment: "Great product",
  }
]