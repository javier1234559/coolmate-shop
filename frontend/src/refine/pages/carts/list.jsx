import { List, Breadcrumb, TextField, ImageField, useTable, EditButton, ShowButton } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space } from 'antd';

export const CartList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'carts' });

  console.log(tableProps);
  const categoryIds = tableProps?.dataSource?.map((item) => item.category.id) ?? [];

  return (
    <List title="Here's a carts manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="#Id"
          render={(value) => {
            return <TextField strong value={`#${value}`} />;
          }}
        />
        <Table.Column
          title="Icon"
          dataIndex="icon"
          render={(value) => {
            return <ImageField value={value} title={'Image content'} width={50} />;
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
