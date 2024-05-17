import { useEffect, useState } from 'react';
import orderApi from '~/services/orderApi';
import toast from 'react-hot-toast';
import { PAYMENT_METHODS, PAYMENT_STATUS, ORDER_STATUS } from '~/constants';
import { useLocation } from 'react-router-dom';
import { Card, Typography, Row } from 'antd';

const { Title, Paragraph } = Typography;

function Thanks() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');
  const paymentMethod = queryParams.get('paymentMethod');
  console.log('orderId', orderId);
  console.log('paymentMethod', paymentMethod);
  const [orderStatus, setOrderStatus] = useState(ORDER_STATUS.PENDING);
  const [paymentStatus, setPaymentStatus] = useState(PAYMENT_STATUS.UNPAID);

  useEffect(() => {
    const checkStatusZaloPayGateway = async () => {
      if (!orderId) {
        toast.error('Order Id is required');
        return;
      }
      const response = await orderApi.checkStatusZaloPayGateway(orderId);
      if (response.data.return_code === 1) {
        setPaymentStatus(PAYMENT_STATUS.PAID);
      } else if (response.data.return_code === 2) {
        setPaymentStatus(PAYMENT_STATUS.PAYMENT_FAILED);
      } else {
        setPaymentStatus(PAYMENT_STATUS.UNPAID);
      }
    };

    const checkStatusMoMoGateway = async () => {
      if (!orderId) {
        toast.error('Order Id is required');
        return;
      }
      const response = await orderApi.checkStatusMoMoGateway(orderId);
      if (response.data.resultCode === 0) {
        setPaymentStatus(PAYMENT_STATUS.PAID);
      } else if (response.data.resultCode === 11) {
        setPaymentStatus(PAYMENT_STATUS.PAYMENT_FAILED);
      } else {
        setPaymentStatus(PAYMENT_STATUS.UNPAID);
      }
    };

    if (paymentMethod === PAYMENT_METHODS.COD.type) {
      setPaymentStatus(PAYMENT_STATUS.UNPAID);
    } else if (paymentMethod === PAYMENT_METHODS.ZALOPAY.type) {
      checkStatusZaloPayGateway();
    } else if (paymentMethod === PAYMENT_METHODS.MOMO.type) {
      checkStatusMoMoGateway();
    }
  }, [paymentMethod, orderId]);

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Card style={{ width: 800, textAlign: 'center' }}>
        <img width={200} src="https://img.freepik.com/premium-vector/thank-you-your-order_96807-2322.jpg" />
        <Title level={2}>Cám ơn đã mua hàng</Title>
        <Paragraph>
          Order id là: <strong>{orderId}</strong>
        </Paragraph>
        <Paragraph>
          Phương thức thanh toán: <strong>{paymentMethod}</strong>
        </Paragraph>
        <Paragraph>
          Trạng thái đơn hàng là: <strong>{orderStatus}</strong>
        </Paragraph>
        <Paragraph>
          Trạng thái thanh toán của đơn hàng là: <strong>{paymentStatus}</strong>
        </Paragraph>
      </Card>
    </Row>
  );
}

export default Thanks;
