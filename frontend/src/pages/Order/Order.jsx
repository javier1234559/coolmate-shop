import { useState, useEffect } from 'react';
import Button from '~/components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addProductQuantity, removeFromCart, clearCart } from '~/redux/cartSlice';
import './Order.css';
import { CartMain } from '~/components/SlidingCart/SlidingCart';
import toast from 'react-hot-toast';
import { calcProvisional, calculateTotal } from '~/utils/utils';
import { PAYMENT_METHODS } from '~/constants';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  });
  const listItem = useSelector((state) => state?.cart?.items);
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.COD.type);
  const [voucherCode, setVoucherCode] = useState('VOUCHER10');
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState('0.00');

  useEffect(() => {
    setTotalPrice(calculateTotal(listItem, voucherDiscount));
  }, [listItem, voucherDiscount]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentSubmited = async (paymentMethod) => {
    if (paymentMethod === PAYMENT_METHODS.COD.type) {
      return;
    }

    if (paymentMethod === PAYMENT_METHODS.MOMO.type) {
      // Call API to handle MOMO payment
      console.log('Redirect to MOMO payment gateway');
      toast.success('Redirect to MOMO payment gateway');
      // Redirect to MOMO payment gateway ...
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    if (!formData.phone.trim() || !/^\d+$/.test(formData.phone)) {
      toast.error('A valid phone number is required');
      return;
    }

    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('A valid email is required');
      return;
    }

    if (!formData.address.trim()) {
      toast.error('Address is required');
      return;
    }

    if (!listItem.length) {
      toast.error('Cart is empty');
      return;
    }

    const formDataWithPaymentMethod = { ...formData, paymentMethod, listItem };

    
    //Handle payment method
    await handlePaymentSubmited(paymentMethod);
    
    console.log('Submitted data:', formDataWithPaymentMethod);
    
    // Call API to submit data

    //show toast success
    toast.success('Order successfully!');

    //delete all items in cart
    dispatch(clearCart());

    //navigate to history order user
    navigate('/profile');
  };

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucherCode = () => {
    event.preventDefault();
    //set just one voucher = VOUCHER10 for testing
    if (voucherCode === 'VOUCHER10') {
      setVoucherDiscount(10);
      toast.success('Voucher code applied');
    } else {
      setVoucherDiscount(0);
      toast.error('Invalid voucher code');
    }
  };

  return (
    <div className="checkout-page">
      <div className="personal-info">
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Thông tin vận chuyển</h2>
          <div className="form-group">
            <input type="text" id="name" name="name" value={formData.name} placeholder="Họ tên" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input type="tel" id="phone" name="phone" value={formData.phone} placeholder="Số điện thoại" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input type="email" id="email" name="email" value={formData.email} placeholder="Email" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input type="text" id="address" name="address" value={formData.address} placeholder="Địa chỉ" onChange={handleInputChange} required />
          </div>

          {/* <div className="form-group">
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
          </div> */}

          <div className="form-group">
            <label htmlFor="note">Ghi chú thêm</label>
            <input id="note" name="note" value={formData.note} onChange={handleInputChange} />
          </div>

          <div className="payment-methods">
            <h2>Hình thức thanh toán</h2>
            <div className="payment-options">
              <input type="radio" id="cod" name="paymentMethod" value={PAYMENT_METHODS.COD.type} checked={paymentMethod === PAYMENT_METHODS.COD.type} onChange={handlePaymentMethodChange} />
              <label htmlFor="cod">{PAYMENT_METHODS.COD.name}</label>
              <br />
              <input type="radio" id="momo" name="paymentMethod" value={PAYMENT_METHODS.MOMO.type} checked={paymentMethod === PAYMENT_METHODS.MOMO.type} onChange={handlePaymentMethodChange} />
              <label htmlFor="momo">{PAYMENT_METHODS.MOMO.name}</label>
              <br />
            </div>
          </div>
          <Button type="submit" variant="black">
            Gửi thông tin
          </Button>
        </form>
      </div>
      <div className="cart-summary">
        <form className="checkout-form">
          <h2>Giỏ hàng</h2>
          {/* <ul>
            <li>
              <span className="label">COOL50K (Còn 193)</span>
              <span className="value">Giảm 50K cho đơn hàng từ 590K</span>
            </li>
            <li>
              <span className="label">SWIMMING (Còn 91)</span>
              <span className="value">Giảm 30K đơn hàng đồ bơi từ 200K</span>
            </li>
          </ul> */}
          <div className="voucher-form">
            <input type="text" placeholder="Nhập mã giảm giá" value={voucherCode} onChange={handleVoucherCodeChange} />
            <Button onClick={handleApplyVoucherCode} variant={'black'} className={'voucher-form button'}>
              Áp dụng
            </Button>
          </div>
          <div className="order-summary">
            <h2>Thông tin đơn hàng</h2>
            <ul>
              <li>
                <span className="label">Tạm tính</span>
                <span className="value">{calcProvisional(listItem)}</span>
              </li>
              <li>
                <span className="label">Giảm giá</span>
                <span className="value">{voucherDiscount}%</span>
              </li>
              <li>
                <span className="label">Phí giao hàng</span>
                <span className="value">Miễn phí</span>
              </li>
              <li className="total">
                <span className="label">Tổng</span>
                <span className="value">{totalPrice}</span>
              </li>
            </ul>
          </div>
          <div className="cart-info">
            <CartMain cart={listItem} addProductQuantity={addProductQuantity} removeFromCart={removeFromCart} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;
