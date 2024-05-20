import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Button, List, Tag } from 'antd';
import { logout } from '~/redux/authSlice';
import authApi from '~/services/authApi';
import orderApi from '~/services/orderApi';
import './Profile.css';
import { PAYMENT_METHOD_COLOR, PAYMENT_STATUS_COLOR, STATUS_COLOR } from '~/constants';

function OrderList() {
  const [myOrders, setmyOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await orderApi.getMyOrders();
      console.log(response.data);
      setmyOrders(response.data);
    };

    fetchOrders();
  }, []);

  // const orders = [
  //   {
  //     id: '1222',
  //     totalPrice: 100,
  //     status: 'Đã bị Từ chối',
  //     paymentStatus: 'Đã Thanh Toán',
  //     paymentMethod: 'MOMO',
  //   },
  //   {
  //     id: '22',
  //     totalPrice: 100,
  //     status: 'Chờ duyệt',
  //     paymentStatus: 'Chưa Thanh Toán',
  //     paymentMethod: 'ZALOPAY',
  //   },
  // ];

  return (
    <>
      {Array.isArray(myOrders) && myOrders.length === 0 ? (
        <h2>Your order is empty</h2>
      ) : (
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={myOrders}
          renderItem={(order) => (
            <List.Item>
              <Card
                title={
                  <Link to={`/history/order/${order.id}`} style={{ color: '#8c45ff', fontWeight: 'bold', textDecoration: 'underline' }}>
                    Order ID: {order.id}
                  </Link>
                }>
                <h1>Total Price: {order.totalPrice}</h1>
                <Tag color={STATUS_COLOR[order.status]}>Status: {order.status}</Tag>
                <Tag color={PAYMENT_STATUS_COLOR[order.paymentStatus]}>Payment Status: {order.paymentStatus}</Tag>
                <Tag color={PAYMENT_METHOD_COLOR[order.paymentMethod]}>Payment Method: {order.paymentMethod}</Tag>
              </Card>
            </List.Item>
          )}
        />
      )}
    </>
  );
}

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user?.accessToken) {
      navigate('/login');
    }

    console.log(user);
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    authApi.logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <Card title="User Profile" className="profile-card">
        <div className="avatar-container">
          <Avatar src={user?.avatar_img} size={100} alt="User Avatar" />
        </div>
        <div className="button-container">
          <Button type="primary" className="custom-button">
            Edit
          </Button>
          <Button type="primary" className="custom-button" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div>
          <Typography.Text className="profile-text">Name: {user?.name}</Typography.Text>
        </div>
        <div>
          <Typography.Text className="profile-text">Email: {user?.email}</Typography.Text>
        </div>
      </Card>

      <Card title="Order History" className="profile-card">
        <OrderList />
      </Card>
    </div>
  );
}

export default Profile;
