import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Avatar, Typography, Button, Row, Col } from 'antd';
import { logout } from '~/redux/authSlice';
import authApi from '~/services/authApi';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth);
  // const cartItems = useSelector((state) => state.cart.items); // Assuming you have a cart reducer
  const navigate = useNavigate();

  const orders = [
    {
      id: 'order1',
      totalPrice: 100,
      items: [
        {
          name: 'Item 1',
          price: 50,
          quantity: 2,
          image: 'https://via.placeholder.com/150',
        },
        {
          name: 'Item 2',
          price: 25,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
    {
      id: 'order2',
      totalPrice: 75,
      items: [
        {
          name: 'Item 3',
          price: 25,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
        {
          name: 'Item 4',
          price: 50,
          quantity: 1,
          image: 'https://via.placeholder.com/150',
        },
      ],
    },
  ];

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

  const navigateToCart = () => {
    navigate('/cart');
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
          <Button type="primary" className="custom-button" onClick={navigateToCart}>
            Navigate To Cart
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
        <Row gutter={16}>
          {orders?.map((order, index) => (
            <Col key={index} span={24}>
              <Card title={`Order ID: ${order.id}, Total Price: ${order.totalPrice}`} className="order-card">
                {order.items.map((item, itemIndex) => (
                  <Card key={itemIndex} title={item.name} className="cart-item-card">
                    <div className="item-container">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                      </div>
                      <div className="item-details">
                        <Typography.Text className="profile-text">Price: {item.price}</Typography.Text>
                        <Typography.Text className="profile-text">Quantity: {item.quantity}</Typography.Text>
                      </div>
                    </div>
                  </Card>
                ))}
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}

export default Profile;
