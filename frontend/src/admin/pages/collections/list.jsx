import { List, Breadcrumb, TextField, useTable, EditButton, ImageField } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space, Image } from 'antd';

export const CollectionList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'collections' });

  return (
    <List title="Here's a collection manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="#Id"
          render={(value) => {
            return <TextField strong value={`#${value}`} />;
          }}
        />
        {/* <Table.Column
          dataIndex="imageSrc"
          title="Image"
          render={(value) => {
            return <Image width={50} src={value} />;
          }}
        /> */}
        <Table.Column dataIndex="thumbnail_image" title="Thumbnail Image" render={(value) => <ImageField value={value} title={'Image content'} width={200} style={{ objectFit: 'cover', borderRadius: '1rem' }} />} />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="description" title="Description" />
        <Table.Column dataIndex="slug" title="Slug" />
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