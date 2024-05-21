
export const categories = [
  {
    icon: `🍟`,
    name: 'Áo Thun',
    description: 'Áo thun dành cho nam '
  },
  {
    icon: `🍔`,
    name: 'Quần dài',
    description: 'Quần dành cho nam'
  },
  {
    icon: `🍔`,
    name: 'Áo khoắc',
    description: 'Áo khoác dành cho nam'
  },
  {
    icon: `🍔`,
    name: 'Áo polo',
    description: 'Áo polo dành cho nam'
  },
  {
    icon: `🍔`,
    name: 'Quần ngắn',
    description: 'Quần dành cho nam'
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
  { name: "Brown", hex_code: "#9b8378" },
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
    rating: 0,
    slug: 'ao-thun-nam-chay-bo-graphic-photic-zone',
    numReviews: 0,
    price: 189000,
    category_id: 1,
    is_active: true
  },
  {
    seller_id: 2,
    name: 'Áo Thun Nam Thể Thao V1',
    brand: 'Brand B',
    description: 'Description for Áo Thun Nam Thể Thao V1',
    rating: 0,
    slug: 'ao-thun-nam-the-thao-v1',
    numReviews: 0,
    price: 239000,
    category_id: 1,
    is_active: true
  },
  {
    seller_id: 3,
    name: 'Quần Jogger Nam UT đa năng',
    brand: 'Coolmate',
    description: `
   <h3 class="product-description__heading">Chi tiết sản phẩm</h3> <div class="product-description__content is-active" rel-script="product-single-content" style="font-size: 16px"><p dir="ltr">Thoải mái vận động, phong cách bất tận là những gì <a href="https://www.coolmate.me/collection/quan-dai-nam">Quần dài nam</a> Jogger UT mang đến cho bạn. Chất liệu Polyamide co giãn, nhẹ tênh cùng thiết kế jogger năng động giúp bạn di chuyển dễ dàng, tự tin thể hiện cá tính trong mọi hoạt động.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/January2024/mceclip0_5.jpg"></p>
<h2 dir="ltr">Đặc điểm nổi bật của Quần Jogger Nam UT đa năng</h2>
<h3 dir="ltr">1. Chất liệu cao cấp thiết kế đa năng</h3>
<p dir="ltr">Quần Jogger Nam UT đa năng được làm từ chất liệu Polyamide co giãn, mang đến sự thoải mái tối đa cho người mặc. Dù bạn di chuyển liên tục trong công việc hay tham gia các hoạt động thể thao ngoài trời, Jogger UT luôn đồng hành cùng bạn mà không gây bất kỳ gò bó nào.</p>
<p dir="ltr">Quần Jogger Nam UT Đa Năng phù hợp cho nhiều hoạt động: tập gym, đi chơi, dạo phố, du lịch... Dễ dàng phối hợp với nhiều kiểu áo khác nhau.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/January2024/mceclip1_78.jpg"></p>
<h3 dir="ltr">2. Khả năng trượt nước độc đáo</h3>
<p dir="ltr">Quần Jogger Nam UT đa năng được trang bị khả năng trượt nước ấn tượng nhờ công nghệ xử lý vải C6 tiên tiến. Nhờ vậy, bạn có thể yên tâm vận động hay di chuyển trong điều kiện mưa nhẹ mà không lo bị thấm nước.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/December2023/mceclip2_1.jpg"></p>
<h3 dir="ltr">3. Khả năng co giãn vượt trội</h3>
<p dir="ltr">Bên cạnh đó, quần cũng được thiết kế với chất liệu vải Polyamide co giãn 4 chiều, mang đến cho bạn sự thoải mái tối đa trong mọi hoạt động.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/December2023/mceclip3_51.jpg"></p>
<h3 dir="ltr">4. Thiết kế 7 túi đựng đồ cá nhân thoải mái</h3>
<p dir="ltr">Sở hữu 7 "túi thần kỳ": 2 túi hộp rộng rãi, 1 túi khóa kéo ẩn an toàn, 2 túi ngoài tiện lợi và 2 túi sau sâu, tha hồ cất giữ mọi vật dụng cần thiết cho cuộc sống năng động của bạn.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/December2023/mceclip5_53.jpg" width="1000"></p>
<h3 dir="ltr">5. Túi hộp to rộng rãi tiện lợi</h3>
<p dir="ltr">Túi hộp to rộng rãi tiện lợi để đựng đồ cá nhân, giúp bạn di chuyển rảnh tay và an tâm tận hưởng mọi khoảnh khắc.</p>
<p style="text-align: left;"><img src="https://mcdn.coolmate.me/image/January2024/mceclip2_40.jpg"></p>
<h3 dir="ltr">6. Túi ẩn mang tính thẩm mỹ</h3>
<p dir="ltr">Nằm khéo léo ngay hông quần, chiếc túi nhỏ nhắn này tuy không cầu kỳ nhưng lại mang đến vô vàn tiện ích cho người sử dụng. Kích thước vừa vặn cho phép bạn cất giữ an toàn những vật dụng cá nhân như điện thoại, ví tiền hay chìa khóa mà không lo bị rơi rớt hay vướng víu khi vận động.&nbsp;</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/December2023/mceclip7_86.jpg"></p>
<h3 dir="ltr">7. Dây rút cạp quần ẩn trong tiện lợi</h3>
<p dir="ltr">Quần Jogger Nam UT đa năng không chỉ ghi điểm bởi thiết kế trẻ trung, năng động mà còn gây ấn tượng với điểm nhấn độc đáo - dây rút tiện lợi. Dây rút được ví như "linh hồn" của chiếc quần, mang đến sự linh hoạt và biến hóa phong cách vô cùng ấn tượng.</p>
<p style="text-align: left;"><img src="https://mcdn.coolmate.me/image/December2023/mceclip8_78.jpg"></p>
<h3 dir="ltr">8. Bảng màu đa dạng dễ lựa chọn</h3>
<p dir="ltr">Với bảng màu sắc đa dạng, từ xanh navy tinh tế đến xanh rêu cá tính và đen huyền bí, bạn sẽ dễ dàng lựa chọn được màu sắc phù hợp với sở thích và phong cách của bản thân.</p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/December2023/mceclip0_98.jpg" width="1000"></p>
<p style="text-align: center;"><img src="https://mcdn.coolmate.me/image/December2023/mceclip0_6.jpg"></p>
<h2 dir="ltr">Bảng size Quần Jogger Nam UT đa năng</h2>
<p dir="ltr">Mặc<a href="https://www.coolmate.me/collection/quan-nam"> quần nam</a> đúng size không chỉ giúp nam giới tự tin, thoải mái trong hoạt động hằng ngày. Để chọn được size áo polo thể thao nam phù hợp nhất, vui lòng tham khảo bảng size chi tiết dưới đây của Coolmate:</p>
<p dir="ltr"><img src="https://mcdn.coolmate.me/image/October2023/mceclip11_26.jpg" width="1000"></p>
<p dir="ltr"></p><div class="info-box">=&gt;&gt; Tham khảo thêm tại<a href="https://www.coolmate.me/size-chart"> https://www.coolmate.me/size-chart</a></div><p></p>
<h2 dir="ltr">Cách phối đồ với Quần Jogger Nam UT đa năng</h2>
<ul>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Quần Jogger nam + Áo phông + Giày sneaker/Giày thể thao</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Quần jogger + Áo sơ mi nam + Giày sneaker/Giày thể thao</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Quần jogger + Áo tank top + Giày boots cao cổ + Phụ kiện balo thể thao</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Quần jogger + Áo hoodie + Áo khoác bomber + Giày sneaker</p>
</li>
</ul>
<p dir="ltr"></p><div class="info-box">&gt;&gt;&gt; Xem thêm: <a href="https://www.coolmate.me/post/quan-jogger-nam-phoi-voi-ao-gi-1067">Quần jogger nam phối với áo gì đẹp ? Phối áo với quần jogger cực cool</a>&nbsp;</div><p></p>
<p dir="ltr"><img src="https://mcdn.coolmate.me/image/January2024/mceclip3_73.jpg"></p>
<p dir="ltr"><img src="https://mcdn.coolmate.me/image/January2024/mceclip4_96.jpg"></p>
<h2 dir="ltr">Hướng dẫn giặt và bảo quản Quần Jogger Nam UT đa năng</h2>
<p dir="ltr">Để giữ cho Quần Jogger Nam UT đa năng luôn bền đẹp và giữ form dáng như mới, bạn cần lưu ý hướng dẫn giặt và bảo quản sau đây:</p>
<h3 dir="ltr">1. Hướng dẫn giặt:</h3>
<ul>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Giặt riêng quần jogger với các loại quần áo khác, đặc biệt là quần có màu sáng.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Lộn trái quần trước khi giặt để bảo vệ mặt ngoài của vải, tránh bị sờn màu.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Sử dụng nước lạnh hoặc nước ấm (nhiệt độ dưới 40 độ C) để giặt quần.&nbsp;</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Sử dụng chế độ giặt nhẹ nhàng trên máy giặt hoặc giặt tay nhẹ nhàng để tránh làm hỏng form dáng của quần.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Phơi khô quần ở nơi thoáng mát, tránh ánh nắng trực tiếp.</p>
</li>
</ul>
<h3 dir="ltr">2. Hướng dẫn bảo quản:</h3>
<ul>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Treo quần jogger trên móc hoặc gấp gọn gàng khi không sử dụng.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Tránh cất giữ quần jogger ở nơi ẩm ướt hoặc có nhiệt độ cao.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Tránh để quần jogger tiếp xúc trực tiếp với các vật sắc nhọn.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">&nbsp;Không ủi quần ở nhiệt độ cao.</p>
</li>
</ul>
<h2 dir="ltr">Chính sách mua hàng tại Coolmate</h2>
<ul>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Miễn phí vận chuyển cho đơn hàng từ 200K.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">60 Ngày đổi trả miễn phí bất kỳ lý do gì. (Xem thêm Chính sách đổi trả<a href="https://www.coolmate.me/page/dich-vu-60-ngay-doi-tra"> tại đây</a>).</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Dịch vụ chăm sóc khách hàng chu đáo, tận tình từ 8:30 - 22:00 mỗi ngày.</p>
</li>
<li dir="ltr" aria-level="1">
<p dir="ltr" role="presentation">Tích lũy nhận hoàn tiền<a href="https://www.coolmate.me/post/coolcash-la-gi-2897"> CoolCash</a> khi trở thành Hội viên<a href="https://www.coolmate.me/page/coolclub-chuong-trinh-khach-hang-than-thiet-cua-coolmate"> CoolClub</a> (Áp dụng khi mua hàng tại website). ​</p>
</li>
</ul>
<p dir="ltr"><img style="display: block; margin-left: auto; margin-right: auto;" src="https://mcdn.coolmate.me/image/March2023/chinh-sach-giao-hang-doi-tra-tai-coolmate.jpg" alt="Chính sách giao hàng đổi trả tại Coolmate" width="1000" height="1161"></p>
<p dir="ltr"></p><div class="info-box"><p></p>
<p dir="ltr">Mua sắm online đa kênh tiện lợi: website coolmate.me,<a href="https://shopee.vn/coolmate.vn"> Shopee Mall</a>,<a href="https://www.lazada.vn/shop/coolmate"> Lazada Mall</a>,<a href="https://www.tiktok.com/@cool.coolmate"> Tik Tok Shop</a>.</p>
<p dir="ltr">Theo dõi kênh<a href="https://zalo.me/coolmate"> Zalo OA Coolmate</a> để cập nhật tình trạng tiếp nhận đơn hàng và các chương trình khuyến mãi.</p>
<p dir="ltr">Nếu muốn trải nghiệm sản phẩm và mua hàng trực tiếp, ghé ngay Cơ sở Hà Nội:<a href="https://www.google.com/maps/place/Coolmate.me/@20.9708027,105.7731748,15z/data=!4m6!3m5!1s0x31345320cfe92f59:0xc409538d7ac466d7!8m2!3d20.9611237!4d105.795238!16s%2Fg%2F11h3spxt4t?entry=ttu"> Tầng 3-4, Tòa nhà BMM, KM2, Đường Phùng Hưng, Phường Phúc La, Quận Hà Đông, TP Hà Nội.</a></p>
<p dir="ltr">Đừng quên truy cập<a href="https://www.coolmate.me/lp/ma-giam-gia-coolmate"> Mã giảm giá Coolmate</a> để cập nhật nhanh nhất các mã giảm giá và voucher ưu đãi hấp dẫn theo từng tháng nhé.</p>
<p dir="ltr"></p></div><p></p>
<p style="text-align: left;">&nbsp;</p></div> 
    
    `,
    rating: 0,
    slug: 'quan-jogger-nam-ut-da-nang',
    numReviews: 0,
    price: 499000,
    category_id: 2,
    is_active: true
  },
  {
    seller_id: 4,
    name: 'Quần Shorts thể thao 7 inch đa năng',
    brand: 'Coolmate',
    description: 'Description for Quần Shorts thể thao 7 inch đa năng',
    rating: 0,
    slug: 'quan-short-the-thao-7-inch-da-nang',
    numReviews: 0,
    price: 169000,
    category_id: 5,
    is_active: true
  },
  {
    seller_id: 5,
    name: 'Quần Jeans Nam Basics dáng Slim fit',
    brand: 'Coolmate',
    description: 'Description for Quần Jeans Nam Basics dáng Slim fit',
    rating: 0,
    slug: 'quan-jeans-nam-basics-dang-nam-slim-fit',
    numReviews: 0,
    price: 499000,
    category_id: 2,
    is_active: true
  },
  {
    seller_id: 6,
    name: 'Áo Khoác Nam có mũ Daily Wear',
    brand: 'Coolmate',
    description: 'Description for Áo Khoác Nam có mũ Daily Wear',
    rating: 0,
    slug: 'ao-khoac-nam-co-mu-dailu-wear',
    numReviews: 0,
    price: 499000,
    category_id: 3,
    is_active: true
  },
  {
    seller_id: 7,
    name: 'Quần Shorts Nam Gym 7" Power',
    brand: 'Coolmate',
    description: 'Description for Quần Shorts Nam Gym 7" Power',
    rating: 0,
    slug: 'quan-sort-nam-gym-7-power',
    numReviews: 0,
    price: 339000,
    category_id: 5,
    is_active: true
  },
  {
    seller_id: 8,
    name: 'Quần Dài Nam Thể Thao Pro Active',
    brand: 'Coolmate',
    description: 'Description for Quần Dài Nam Thể Thao Pro Active',
    rating: 0,
    slug: 'quan-dai-nam-the-thao-pro-active',
    numReviews: 0,
    price: 260000,
    category_id: 2,
    is_active: true
  },
  {
    seller_id: 9,
    name: 'Áo Polo Nam Cafe Bo Kẻ',
    brand: 'Coolmate',
    description: 'Description for Áo Polo Nam Cafe Bo Kẻ',
    rating: 0,
    slug: 'ao-polo-nam-cafe-bo-ke',
    numReviews: 0,
    price: 295000,
    category_id: 4,
    is_active: true
  },
  {
    seller_id: 10,
    name: 'Quần Shorts Nam chạy bộ 2 lớp Essential',
    brand: 'Coolmate',
    description: 'Description for Quần Shorts Nam chạy bộ 2 lớp Essential',
    rating: 0,
    slug: 'quan-short-nam-chay-bo-2-lop-essential',
    numReviews: 0,
    price: 499000,
    category_id: 5,
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
    product_id: 1,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/format=auto/uploads/March2024/24CMAW.PL005.24_13.jpg"
  },
  {
    product_id: 2,
    media_type: 'image',
    media_url: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/photic3d.4.jpg"
  },
  {
    product_id: 2,
    media_type: 'image',
    media_url: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/photic3d.4.jpg"
  },
  {
    product_id: 3,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2024/utdanangthumb231.jpg"
  },
  {
    product_id: 3,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2023/23CMCW.QJ003.16.jpg"
  },
  {
    product_id: 3,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2024/joggerutdanang6.jpg"
  },
  {
    product_id: 3,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/December2023/23CMCW.QJ003.16.jpg"
  },
  {
    product_id: 4,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2024/thumb7indanan2_81_copy.jpg"
  },
  {
    product_id: 5,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/23CMCW.JE002.7_72.jpg"
  },
  {
    product_id: 6,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/October2023/CM006.thumb1.2_74.jpg"
  },
  {
    product_id: 7,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/February2024/qs.7.gp.7.jpg"
  },
  {
    product_id: 8,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/October2023/QD001.4_21.jpg"
  },
  {
    product_id: 9,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2024/24CMCW.PL001.THUMB1_41.jpg"
  },
  {
    product_id: 10,
    media_type: 'image',
    media_url: "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/July2023/QCBUF2-THUMB-1.jpg"
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
  },
  {
    quantity: 100,
    product_id: 3,
    color_id: 1,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 3,
    color_id: 1,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 3,
    color_id: 1,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 3,
    color_id: 1,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 1,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 2,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 2,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 4,
    color_id: 2,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 2,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 2,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 3,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 3,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 4,
    color_id: 3,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 3,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 3,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 4,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 4,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 4,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 4,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 4,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 5,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 5,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 5,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 5,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 4,
    color_id: 5,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 1,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 2,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 2,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 5,
    color_id: 2,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 2,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 2,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 3,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 3,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 5,
    color_id: 3,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 3,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 3,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 4,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 5,
    color_id: 4,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 4,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 4,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 4,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 5,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 5,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 5,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 5,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 6,
    color_id: 5,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 4,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 4,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 4,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 5,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 5,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 5,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 5,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 7,
    color_id: 5,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 4,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 4,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 4,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 5,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 5,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 5,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 5,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 8,
    color_id: 5,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 1,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 2,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 2,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 9,
    color_id: 2,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 2,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 2,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 3,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 3,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 9,
    color_id: 3,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 3,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 3,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 4,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 4,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 4,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 4,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 4,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 5,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 5,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 5,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 5,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 9,
    color_id: 5,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 1,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 2,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 2,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 10,
    color_id: 2,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 2,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 2,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 3,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 3,
    size_id: 2,
  }
  ,
  {
    quantity: 100,
    product_id: 10,
    color_id: 3,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 3,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 3,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 4,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 4,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 4,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 4,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 4,
    size_id: 5,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 5,
    size_id: 1,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 5,
    size_id: 2,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 5,
    size_id: 3,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 5,
    size_id: 4,
  },
  {
    quantity: 100,
    product_id: 10,
    color_id: 5,
    size_id: 5,
  },


]

// export const productColorSizes = [
//   {
//     quantity: 100,
//     product_id: 1,
//     color_id: 1,
//     size_id: 1,
//   },
//   {
//     quantity: 100,
//     product_id: 1,
//     color_id: 1,
//     size_id: 2,
//   },
//   {
//     quantity: 100,
//     product_id: 1,
//     color_id: 1,
//     size_id: 3,
//   },
//   {
//     quantity: 100,
//     product_id: 1,
//     color_id: 1,
//     size_id: 4,
//   }
//   ,
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 1,
//     size_id: 5,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 2,
//     size_id: 1,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 2,
//     size_id: 2,
//   }
//   ,
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 2,
//     size_id: 3,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 2,
//     size_id: 4,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 2,
//     size_id: 5,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 3,
//     size_id: 1,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 3,
//     size_id: 2,
//   }
//   ,
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 3,
//     size_id: 3,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 3,
//     size_id: 4,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 3,
//     size_id: 5,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 4,
//     size_id: 1,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 4,
//     size_id: 2,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 4,
//     size_id: 3,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 4,
//     size_id: 4,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 4,
//     size_id: 5,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 5,
//     size_id: 1,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 5,
//     size_id: 2,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 5,
//     size_id: 3,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 5,
//     size_id: 4,
//   },
//   {
//     quantity: 100,
//     product_id: 2,
//     color_id: 5,
//     size_id: 5,
//   }

// ]


export const collections = [
  {
    product_ids: [1, 2, 3, 4],
    title: 'Coolmate basic ',
    description: 'Summer Collection basic là bộ sưu tập đơn giản nhưng không kém phần nổi bật, phù hợp với mọi hoàn cảnh, mọi lứa tuổi. Bộ sưu tập này giúp bạn tự tin hơn trong mọi hoàn cảnh.',
    slug: 'summer-basic',
    is_active: true,
    thumbnail_image: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=90,format=auto/uploads/January2024/Banner-Basic_copytet.jpg'
  },
  {
    product_ids: [10, 9, 8, 7, 6, 5],
    title: 'Ready to wear',
    description: 'Bộ sưu tập Ready to wear là bộ sưu tập mới nhất của Coolmate, với những thiết kế mới lạ, độc đáo, chất lượng cao, giúp bạn tự tin hơn trong mọi hoàn cảnh.',
    slug: 'ready-to-wear',
    is_active: true,
    thumbnail_image: 'https://media.coolmate.me/cdn-cgi/image/width=1920,quality=80,format=auto/uploads/September2023/Ready-2-wear-banner19_84.jpg'
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