import { useEffect, useState } from 'react';
import './OrderHistory.css';
import { useParams } from 'react-router-dom';
import { PAYMENT_METHODS, PAYMENT_STATUS_COLOR, STATUS_COLOR } from '~/constants';
import { Form, Input, Rate, Button } from 'antd';
import orderApi from '~/services/orderApi';
import { Tag } from 'antd';
import toast from 'react-hot-toast';
import productApi from '~/services/productApi';

const mockOrder = {
  id: 1,
  id_payment: null,
  name: '',
  phone: '',
  email: '',
  shippingAddress: '',
  noteFromCustomer: '',
  status: 'Chờ duyệt',
  paymentStatus: 'Chưa Thanh Toán',
  paymentMethod: 'COD',
  totalPrice: 0,
  isPaid: false,
  paidAt: null,
  isDelivered: true,
  deliveredAt: null,
  items: [
    {
      id: 1,
      product_slug: 'ao-thun-nam-the-thao-v1',
      name: 'Áo Thun Nam Thể Thao V1',
      color: 'Green',
      size: 'S',
      image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/photic3d.4.jpg',
      quantity: 1,
      price: 49.99,
      totalPrice: 49.99,
      created_at: '2024-05-18T08:35:03.927Z',
      modified_at: '2024-05-18T08:35:03.927Z',
    },
  ],
};

const ReviewProduct = (props) => {
  const { productSlug } = props;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await productApi.createReviewProduct(productSlug, values);
      setRating(values.data);
      setComment(values.comment);
      setSubmitted(true);
      toast.success('Review submitted successfully');
    } catch (error) {
      toast.error('Failed to submit review');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="review_form" onFinish={onFinish}>
      <Form.Item name="rating" style={{ marginBottom: 4 }}>
        <Rate disabled={submitted} value={rating} />
      </Form.Item>
      {submitted ? (
        <p>{comment}</p>
      ) : (
        <Form.Item name="comment" style={{ marginBottom: 4 }}>
          <Input.TextArea placeholder="Write your review here" />
        </Form.Item>
      )}
      {!submitted && (
        <Form.Item style={{ marginBottom: 8 }}>
          <Button htmlType="submit" loading={loading} style={{ backgroundColor: 'black', color: 'white', width: 'auto', padding: '0.2rem 1rem 0.2rem 1rem ' }}>
            Đánh Gía
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

const OrderHistory = () => {
  // get path params in router dom
  const { id } = useParams();
  const [order, setOrder] = useState(mockOrder);
  const [listItem, setListItem] = useState([]);

  useEffect(() => {
    orderApi.getOrderById(id).then((res) => {
      setOrder(res.data);
      setListItem(res.data.items);
      console.log(res.data);
    });
  }, [id]);

  return (
    <div className="checkout-page">
      <div className="personal-info">
        <form className="checkout-form">
          <h2>Thông tin vận chuyển</h2>
          <div className="form-group">
            <input disabled type="text" id="name" name="name" value={order?.name} placeholder="Họ tên" />
          </div>
          <div className="form-group">
            <input disabled type="tel" id="phone" name="phone" value={order?.phone} placeholder="Số điện thoại" />
          </div>
          <div className="form-group">
            <input disabled type="email" id="email" name="email" value={order?.email} placeholder="Email" />
          </div>
          <div className="form-group">
            <input disabled type="text" id="address" name="address" value={order?.shippingAddress} placeholder="Địa chỉ" />
          </div>

          <div className="form-group">
            <label htmlFor="note">Ghi chú thêm</label>
            <input disabled id="note" name="note" value={order?.noteFromCustomer} />
          </div>

          <div className="payment-methods">
            <h2>Hình thức thanh toán</h2>
            <div className="payment-options">
              <input disabled type="radio" id="cod" name="paymentMethod" value={PAYMENT_METHODS.COD.type} checked={order?.paymentMethod === PAYMENT_METHODS.COD.type} />
              <label htmlFor="cod">{PAYMENT_METHODS.COD.name}</label>
              <br />
              <input disabled type="radio" id="zalopay" name="paymentMethod" value={PAYMENT_METHODS.ZALOPAY.type} checked={order?.paymentMethod === PAYMENT_METHODS.ZALOPAY.type} />
              <label htmlFor="zalopay">{PAYMENT_METHODS.ZALOPAY.name}</label>
              <br />
              <input disabled type="radio" id="momo" name="paymentMethod" value={PAYMENT_METHODS.MOMO.type} checked={order?.paymentMethod === PAYMENT_METHODS.MOMO.type} />
              <label htmlFor="momo">{PAYMENT_METHODS.MOMO.name}</label>
              <br />
            </div>
          </div>
        </form>
      </div>
      <div className="cart-summary">
        <div className="checkout-form">
          <h2>Giỏ hàng</h2>

          <div className="voucher-form">
            <input type="text" placeholder="Nhập mã giảm giá" value={'VOUCHE'} disabled />
          </div>
          <div className="order-summary">
            <h2>Thông tin đơn hàng</h2>
            <ul>
              {/* <li>
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
              </li> */}
              <li className="total">
                <span className="label">Tổng</span>
                <span className="value">{order?.totalPrice}</span>
              </li>
              <li className="total">
                <span className="label">Trạng thái đơn hàng:</span>
                <Tag color={STATUS_COLOR[order.status]}>{order?.status}</Tag>
              </li>
              <li className="total">
                <span className="label">Trạng thái thanh toán:</span>
                <Tag color={PAYMENT_STATUS_COLOR[order?.paymentStatus]}>{order?.paymentStatus}</Tag>
              </li>
            </ul>
          </div>
          <h2>Chi tiết đơn hàng</h2>
          <div className="cart-info">
            {listItem && listItem.length <= 0 ? (
              <>
                <h1>Items is empty</h1>
              </>
            ) : (
              listItem.map((item, index) => {
                return (
                  <>
                    <div className="cart-product" key={index}>
                      <img src={item?.image} />
                      <div className="cart-product_info">
                        <h3>{item?.name}</h3>
                        <div>
                          <Tag>Size: {item.size}</Tag>
                          <Tag color={item.color}>Color: {item.color}</Tag>
                        </div>
                        <p className="qty-history">Quantity: {item.quantity}</p>
                        <ReviewProduct productSlug={item.product_slug} />
                      </div>
                      <p className="cart-product_price">{item.totalPrice}đ</p>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
