import { useShow } from '@refinedev/core';
import {  List, Rate, Tag } from 'antd';
import { Show,  } from '@refinedev/antd';
import { Typography } from 'antd';
import { Switch } from 'antd';
const { Title, Text } = Typography;
import { Image } from 'antd';

export const ProductShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading} canDelete={false}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Brand</Title>
      <Text>{record?.brand}</Text>

      <Title level={5}>Description</Title>
      <Text>{record?.description}</Text>

      <Title level={5}>Rating</Title>
      <Rate value={record?.rating} disabled />

      <Title level={5}>Slug</Title>
      <Text>{record?.slug}</Text>

      <Title level={5}>Number of Reviews</Title>
      <Text>{record?.numReviews}</Text>

      <Title level={5}>Price</Title>
      <Text>{record?.price}</Text>

      <Title level={5}>Is Active</Title>
      <Switch value={record?.is_active} disabled />

      <Title level={5}>Category</Title>
      <Text>{record?.category.name}</Text>

      <Title level={3}>Media</Title>
      <List
        itemLayout="horizontal"
        dataSource={record?.media}
        renderItem={(item) => (
          <List.Item>
            <Image src={item.media_url} width={50} height={50} />
          </List.Item>
        )}
      />

      <Title level={3}>Color Sizes</Title>
      <List
        itemLayout="horizontal"
        dataSource={record?.colorSizes}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={
                <>
                  <Tag color={item.color.hex_code}>{item.color.name}</Tag>
                  <Tag>{item.size.name}</Tag>
                </>
              }
              description={`Quantity: ${item.quantity}`}
            />
          </List.Item>
        )}
      />
    </Show>
  );
};
