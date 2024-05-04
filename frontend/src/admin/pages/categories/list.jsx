import { List, Breadcrumb, TextField, TagField, ImageField, useTable, EditButton, ShowButton } from '@refinedev/antd';
import { useMany } from '@refinedev/core';
import { usePermissions } from '@refinedev/core';
import { Table, Space } from 'antd';

export const CategoryList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'categories' });

  console.log(tableProps);

  return (
    <List title="Here's a category manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
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
            return <span dangerouslySetInnerHTML={{ __html: value }} />;
          }}
        />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="medium" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
