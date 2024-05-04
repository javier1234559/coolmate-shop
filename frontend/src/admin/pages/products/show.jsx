import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/antd";
import { Typography } from "antd";
const { Title, Text } = Typography;

export const ProductShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;
  console.log(record)
  const { data: categoryData, isLoading: categoryIsLoading } =
    useOne({
      resource: "products",
      id: record?.category.id || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <Text>{record?.id}</Text>

      <Title level={5}>Title</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
    </Show>
  );
};