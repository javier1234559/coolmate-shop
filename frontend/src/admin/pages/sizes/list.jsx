import { List, Breadcrumb, TextField, useTable, EditButton, TagField } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space} from 'antd';

export const SizeList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'sizes' });

  return (
    <List title="Here's a color manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="#Id"
          render={(value) => {
            return <TextField strong value={`#${value}`} />;
          }}
        />
        <Table.Column
          dataIndex="name" title="Name"
          render={(value) => {
            return <TagField value={value} />;
          }}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
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