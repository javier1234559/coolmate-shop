import React, { useState, useEffect } from 'react';
import './Order.css';

const Order = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Hồ Chí Minh',
    district: '',
    ward: '',
    note: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [voucherCode, setVoucherCode] = useState('');

  useEffect(() => {
    // useEffect logic
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    if (event.target.value === 'momo') {
      // Xử lý logic khi chọn thanh toán bằng MoMo
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataWithPaymentMethod = { ...formData, paymentMethod };
    console.log('Submitted data:', formDataWithPaymentMethod);
    // Replace with your actual form submission logic (e.g., sending data to a server)
  };

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucherCode = () => {
    // Apply voucher code logic
  };

  return (
    <div className="checkout-page">
      <div className="personal-info">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Thông tin vận chuyển</h2>
          <p>Bạn đã có tài khoản? <a href="#">Đăng nhập ngay</a></p>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              placeholder='Họ tên'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              placeholder='Số điện thoại'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              placeholder='Email'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              placeholder='Địa chỉ'
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">Thành phố</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn Thành phố</option>
              <option value="Hanoi">Hà Nội</option>
              <option value="HoChiMinh">Hồ Chí Minh</option>
              {/* Thêm các thành phố khác ở đây */}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="district">Quận/Huyện</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn Quận/Huyện</option>
              <option value="Quan1">Quận 1</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="ward">Phường/Xã</label>
            <select
              id="ward"
              name="ward"
              value={formData.ward}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn Phường/Xã</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="note">Ghi chú thêm</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
            />
          </div>

          <div className="payment-methods">
            <h2>Hình thức thanh toán</h2>
            <div className="payment-options">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cod">COD - Thanh toán khi nhận hàng</label>
              <br />
              <input
                type="radio"
                id="momo"
                name="paymentMethod"
                value="momo"
                checked={paymentMethod === "momo"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="momo">MoMo - Thanh toán qua MoMo</label>
              <br />
            </div>
          </div>

          <button type="submit">Gửi thông tin</button>
        </form>
      </div>
      <div className="cart-summary">
        <h2>Giỏ hàng</h2>
        <ul>
          <li>
            <span className="label">COOL50K (Còn 193)</span>
            <span className="value">Giảm 50K cho đơn hàng từ 590K</span>
          </li>
          <li>
            <span className="label">SWIMMING (Còn 91)</span>
            <span className="value">Giảm 30K đơn hàng đồ bơi từ 200K</span>
          </li>
        </ul>
        <div className="voucher-form">
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={voucherCode}
            onChange={handleVoucherCodeChange}
          />
          <button onClick={handleApplyVoucherCode}>Áp dụng</button>
        </div>
        <div className="order-summary">
          <h2>Thông tin đơn hàng</h2>
          <ul>
            <li>
              <span className="label">Tạm tính</span>
              <span className="value">0đ</span>
            </li>
            <li>
              <span className="label">Giảm giá</span>
              <span className="value">0đ</span>
            </li>
            <li>
              <span className="label">Phí giao hàng</span>
              <span className="value">Miễn phí</span>
            </li>
            <li className="total">
              <span className="label">Tổng</span>
              <span className="value">0đ</span>
            </li>
          </ul>
          <div className="coolcash-info">
            <span className="label">Hoàn tiền CoolCash</span>
            <span className="value">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
