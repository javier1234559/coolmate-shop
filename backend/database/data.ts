
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
  { name: "Red", hex_code: "#e06c66" },
  { name: "Green", hex_code: "#98c363" },
  { name: "Blue", hex_code: "#3965bd" },
  { name: "Yellow", hex_code: "#ffcb6b" },
  { name: "Pink", hex_code: "#efa19b" },
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
    phone: "1234567890",
    role: "user",
    avatar_img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/59.jpg",
  },
  {
    name: "Jane Smith",
    email: "admin@gmail.com",
    password: "Admin@123",
    phone: "+9876543210",
    role: "admin",
    avatar_img: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1237.jpg",
  }
];

// export const userAddresses = [
//   {
//     address: "123 Main St",
//     city: "New York",
//     district: "Manhattan",
//     commune: "Downtown",
//     phone: "9876543210",
//     user_id: 1
//   },
//   {
//     address: "1999 Main St",
//     city: "Hawaii",
//     district: "Manhattan",
//     commune: "Downtown",
//     phone: "9876543210",
//     user_id: 2
//   },

// ];


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
    description:
      `
    <div class="product-description__content is-load" rel-script="product-single-content" style="font-size: 16px"><p dir="ltr">Áo Polo Nam Thể Thao Promax-S1 <a href="https://www.coolmate.me/">Coolmate</a> chất liệu Poly thoáng khí, mát mẻ và nhanh khô. Sản phẩm được thiết kế kiểu dáng Regular fit dáng suông thích hợp sử dụng khi đi làm, đi chơi hoặc mặc ở nhà đều được mà nam giới nên có trong tủ đồ của mình.&nbsp;</p>
<h2 dir="ltr"><strong>Tại sao nên lựa chọn Áo Polo Nam Thể Thao Promax-S1 tại Coolmate?</strong></h2>
<ul>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation"><a href="https://www.coolmate.me/product/ao-polo-the-thao-nam-promax-s1-logo-1?color=xanh-navy">Áo Polo Nam Thể Thao Promax-S1</a> có khả năng xử lý hoàn thiện vải nhanh khô, thấm hút tốt, bề mặt vải nhiều lỗ nhỏ gia tăng khả năng thoát ẩm, phối đồ dễ dàng, sử dụng linh hoạt khi đi làm, đi chơi hoặc ở nhà.&nbsp;</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Chương trình miễn phí vận chuyển cho đơn hàng từ 200K</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Đổi trả hàng hoàn toàn miễn phí trong vòng 60 ngày</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Dịch vụ tư vấn, chăm sóc khách hàng chuyên nghiệp, tận tâm</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Trở thành thành viên <a href="https://www.coolmate.me/page/coolclub-chuong-trinh-khach-hang-than-thiet-cua-coolmate">CoolClub</a> với nhiều ưu đãi hấp dẫn!</p>
</li>
</ul>
<h2 dir="ltr"><strong>Đặc điểm nổi bật của Áo Polo Nam Thể Thao Promax-S1</strong></h2>
<h3 dir="ltr" style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip0_59.jpg" width="1000"></h3>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip1_71.jpg" width="1000"></p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip2_80.jpg" width="1000"></p>
<p>Thành phần vải áo Polo nam sử dụng 100% Poly, định lượng vải 155gsm siêu nhẹ đã được hoàn thiện tính năng Quick-Dry và Wicking mang tới cho bạn cảm giác mát mẻ và luôn khô thoáng, tăng khả năng khử mùi.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip3_29.jpg" width="1000"></p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip4_21.jpg" width="1000"></p>
<p>Chất liệu Poly có bề mặt vải nhiều lỗ nhỏ, hỗ trợ gia tăng sự thoát mồ hôi, giúp áo nhanh khô hơn các dòng áo truyền thống.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip5_70.jpg" width="1000"></p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/May2023/mceclip0_131.jpg" width="1000"></p>
<p>Thiết kế <a href="https://www.coolmate.me/collection/ao-polo-nam">áo polo nam</a> dáng suông Regular fit mang đến cho người dùng sự vừa vặn với dáng người, thích hợp mặc khi đi làm, đi chơi hay ở nhà đều thoải mái và lịch sự.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip8_24.jpg" width="1000"></p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip9_93.jpg" width="1000"></p>
<p>Tông màu <a href="https://www.coolmate.me/collection/ao-nam">áo nam</a> có nhiều sư lựa chọn như Xanh Navy, Xanh bóng đêm, Xanh Aqua, Trắng, Đen là các màu trung tính, khiến bạn dễ dàng phối đồ với mọi trong phục, thể hiện được nét nam tính của riêng mình.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/February2023/mceclip10_32.jpg" width="1000"></p>
<p style="text-align: center;"><strong><img src="https://mcdn.coolmate.me/image/January2023/dri-breathe-sat-nach-111_75.jpg" alt="" width="1000"></strong></p>
<h2 dir="ltr"><strong>Cách phối đồ với Áo Polo Nam Thể Thao Promax-S1</strong></h2>
<p dir="ltr">Áo Polo Nam Thể Thao Promax-S1 là dòng áo polo được khá nhiều nam giới ưa thích, không chỉ dễ mặc mà sản phẩm cũng rất dễ phối đồ. Trong đó, bạn có thể phối áo polo nam với quần jogger, suit jacket/blazer, quần kaki, quần tây,...&nbsp;</p>
<p dir="ltr">Để outfit phối cùng Áo Polo Nam Thể Thao Promax-S1 trở nên hoàn thiện, các chàng có thể tham khảo những bí kíp phối đồ thông qua <a href="https://www.coolmate.me/post/phoi-ao-polo-nam-thoi-trang-sanh-dieu?gad_source=1&amp;gclid=Cj0KCQiA5-uuBhDzARIsAAa21T9zG3Yby7aSkz6UM68y6igb0DxxnATaADdVh6cDodV-VHYHLr1rBEkaAmBmEALw_wcB">Mách chàng từ A- Z cách phối đồ với áo polo nam thời trang, sành điệu</a>.</p>
<h2 dir="ltr"><strong>Cách giặt và bảo quản Áo Polo Nam Thể Thao Promax-S1 đơn giản nhất</strong></h2>
<ul>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Thay vì giặt máy thì giặt tay sẽ giúp đảm bảo được độ bền của áo.&nbsp;</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Hạn chế đổ trực tiếp bột giặt/xà phòng lên bề mặt áo nhằm tránh ảnh hưởng đến chất liệu.&nbsp;</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Nên giặt áo Polo nam với nước lạnh hoặc nước ấm.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Không nên phơi áo trực tiếp dưới ánh nắng mặt trời.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Sau khi phơi khô nên gấp gọn gàng trong tủ, không nên treo bằng móc tránh dão phần cổ áo.&nbsp;</p>
</li>
</ul>
<p dir="ltr">Nếu các chàng đang có mong muốn rinh chiếc Áo Polo Nam Thể Thao Promax-S1, hãy đặt online ở website Coolmate.me,<a href="https://www.facebook.com/coolmate.me"> Fanpage Coolmate</a>. Hoặc các gian hàng của Coolmate trên <a href="https://shopee.vn/coolmate.vn">Shopee Mall</a>, <a href="https://www.lazada.vn/shop/coolmate">Lazada Mall</a> hoặc Tiktok shop.&nbsp;</p>
<p dir="ltr">Bạn có thể theo dõi kênh <a href="https://zalo.me/coolmate">Zalo OA Coolmate</a> để biết được tình trạng tiếp nhận đơn hàng và các chương trình khuyến mãi.</p>
<p dir="ltr">Bạn cũng có thể đến trải nghiệm và mua trực tiếp tại:&nbsp;</p>
<ul>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation"><a href="https://www.google.com/maps/place/Coolmate.me/@20.9708027,105.7731748,15z/data=!4m6!3m5!1s0x31345320cfe92f59:0xc409538d7ac466d7!8m2!3d20.9611237!4d105.795238!16s%2Fg%2F11h3spxt4t?entry=ttu">Cơ sở Hà Nội</a>: Tầng 3-4, Tòa nhà BMM, KM2, Đường Phùng Hưng, Phường Phúc La, Quận Hà Đông, TP Hà Nội.</p>
</li>
</ul>
<p dir="ltr">Đừng quên cập nhật ưu đãi, voucher hàng tháng tại<a href="https://www.coolmate.me/lp/ma-giam-gia-coolmate"> Mã giảm giá Coolmate</a></p></div>
    `,
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
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 2,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 2,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 2,
    color_id: 2,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 2,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 2,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 3,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 3,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 2,
    color_id: 3,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 3,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 3,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 4,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 4,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 4,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 4,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 4,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 5,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 5,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 5,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 5,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 2,
    color_id: 5,
    size_id: 5,
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
    noteFromCustomer: "Dont deliver after 2pm",
    paymentMethod: "Credit Card",
    deliveryDetail_id: 1,
    paymentResult_id: "1",
    item_ids: [],
    itemsPrice: 200,
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
    image: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/24CMAW.AT011.1_91.jpg",
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

export const discounts = [
  {
    discountValue: 10,
    discountCode: "VOUCHER10",
    quantity: 2
  },
  {
    discountValue: 20,
    discountCode: "VOUCHER20",
    quantity: 5
  }
]