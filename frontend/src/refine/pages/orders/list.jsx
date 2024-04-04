import { List, Breadcrumb, TextField, TagField, ImageField, useTable, EditButton, ShowButton } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space } from 'antd';

export const OrderList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'orders' });

  console.log(tableProps);
  const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? [];

  return (
    <List title="Here's a order manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="#Id"
          render={(value) => {
            return <TextField strong value={`#${value}`} />;
          }}
        />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="medium" recordItemId={record.id} />
              <ShowButton hideText size="medium" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
