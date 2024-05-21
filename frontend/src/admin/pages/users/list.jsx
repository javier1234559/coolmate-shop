import { List, Breadcrumb, TextField, TagField, ImageField, useTable, EditButton } from '@refinedev/antd';
import { useMany } from '@refinedev/core';
import { usePermissions } from '@refinedev/core';
import { Table, Space } from 'antd';

export const UserList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'users' });

  console.log(tableProps);

  const categoryIds = tableProps?.dataSource?.map((item) => item.category?.id) ?? [];

  const { data, isLoading } = useMany({
    resource: 'categories',
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <List title="Here's a user manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
      <Table {...tableProps} scroll={{ x: 'max-content' }} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="#Id"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return <TextField strong value={`#${value}`} />;
          }}
        />
        <Table.Column
          title="Image"
          dataIndex="avatar_img"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return <ImageField value={value} title={'Image content'} width={50} style={{ borderRadius: '1rem' }} />;
          }}
        />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="phone" title="Phone" />
        <Table.Column
          dataIndex="role"
          title="Role"
          render={(value) => {
            if (value == 'admin') {
              return <TagField color="red" value={value} />;
            }
            return <TagField color="green" value={value} />;
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          fixed="right"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="medium" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
