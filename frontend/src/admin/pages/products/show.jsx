import { useShow, useOne } from '@refinedev/core';
import { Rate } from 'antd';
import { Show, MarkdownField } from '@refinedev/antd';
import { Typography } from 'antd';
import { Switch } from 'antd';
const { Title, Text } = Typography;
import { Image } from 'antd';

export const ProductShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  console.log(record);
  // const { data: categoryData, isLoading: categoryIsLoading } =
  //   useOne({
  //     resource: "products",
  //     id: record?.category?.id || "",
  //     queryOptions: {
  //       enabled: !!record,
  //     },
  //   });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Seller Id</Title>
      <Text>{record?.seller_id}</Text>

      <Title level={5}>Name</Title>
      <MarkdownField value={record?.name} />

      <Title level={5}>Brand</Title>
      <MarkdownField value={record?.brand} />

      <Title level={5}>Is Active</Title>
      <Switch checked={record?.is_active} disabled />

      <Title level={5}>Price</Title>
      <Text>{record?.price}</Text>

      <Title level={5}>Rating</Title>
      <Rate value={record?.rating} disabled />

      <Title level={5}>Slug</Title>
      <MarkdownField value={record?.slug} />

      <Title level={5}>Media</Title>
      {record?.media.map((mediaItem, index) => (
        <Image
          key={index}
          width={60}
          src={mediaItem.media_url}
          style={{ borderRadius: '1rem' }}
        />
      ))}

      <Title level={5}>Description</Title>
      <MarkdownField value={record?.description} />
    </Show>
  );
};
