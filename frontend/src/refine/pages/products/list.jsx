import { List, TextField, useTable, EditButton, ShowButton } from '@refinedev/antd';
import { useMany } from '@refinedev/core';

import { Table, Space } from 'antd';

export const ProductList = () => {
  const { tableProps } = useTable({ resource: 'products' });
  console.log(tableProps);
  const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany({
    resource: 'categories',
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column
          dataIndex={['category', 'id']}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return <TextField value={data?.data.find((item) => item.id === value)?.title} />;
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
