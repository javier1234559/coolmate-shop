import { useShow } from '@refinedev/core';
import { Show } from '@refinedev/antd';
import { Typography, Switch, Tag, List, Image } from 'antd';
import { PAYMENT_METHOD_COLOR, PAYMENT_STATUS_COLOR, STATUS_COLOR } from '~/constants';

const { Title, Text } = Typography;

export const OrderShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading} canDelete={false}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Phone</Title>
      <Text>{record?.phone}</Text>

      <Title level={5}>Email</Title>
      <Text>{record?.email}</Text>

      <Title level={5}>Shipping Address</Title>
      <Text>{record?.shippingAddress}</Text>

      <Title level={5}>Note From Customer</Title>
      <Text>{record?.noteFromCustomer}</Text>
      <Title level={5}>Status</Title>
      <Tag color={STATUS_COLOR[record?.status]}>{record?.status}</Tag>

      <Title level={5}>Payment Status</Title>
      <Tag color={PAYMENT_STATUS_COLOR[record?.paymentStatus]}>{record?.paymentStatus}</Tag>

      <Title level={5}>Payment Method</Title>
      <Tag color={PAYMENT_METHOD_COLOR[record?.paymentMethod]}>{record?.paymentMethod}</Tag>

      <Title level={5}>Total Price</Title>
      <Text>{record?.totalPrice}</Text>

      <Title level={5}>Is Paid?</Title>
      <Switch checked={record?.isPaid} disabled />

      <Title level={5}>Paid At</Title>
      <Text>{record?.paidAt}</Text>

      <Title level={5}>Is Delivered?</Title>
      <Switch checked={record?.isDelivered} disabled />

      <Title level={5}>Delivered At</Title>
      <Text>{record?.deliveredAt}</Text>

      <List
        itemLayout="horizontal"
        dataSource={record?.items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta avatar={<Image src={item.image} alt={item.name} width={50} height={50} />} title={item.name} description={`Color: ${item.color}, Size: ${item.size}, Quantity: ${item.quantity}`} />
            <div>
              <div>Price: {item.price}</div>
              <div>Total Price: {item.totalPrice}</div>
            </div>
          </List.Item>
        )}
      />

      <Title level={5}>Created At</Title>
      <Text>{record?.created_at}</Text>

      <Title level={5}>Modified At</Title>
      <Text>{record?.modified_at}</Text>
    </Show>
  );
};
