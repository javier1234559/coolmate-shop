import { List, Breadcrumb, TextField, useTable, EditButton } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space ,Tag} from 'antd';

export const ColorList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'colors' });

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
        <Table.Column dataIndex="name" title="Name" />
        
        <Table.Column
          dataIndex="hex_code"
          title="Hex Code"
          render={(value) => {
            return <Tag color={value}>{value}</Tag>;
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