import { List, Breadcrumb, TextField, TagField, ImageField, useTable, EditButton, ShowButton } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space } from 'antd';

export const ProductList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'products' });

  const createSetColor = (item) => {
    console.log('value' + JSON.stringify(item));
    return item?.reduce((acc, tag) => {
      if (!acc.find((color) => color.name === tag.color.name)) {
        acc.push(tag.color);
      }
      return acc;
    }, []);
  };

  return (
    <List title="Here's a product manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'large' }}>
      <Table {...tableProps} scroll={{ x: 'max-content' }} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="#Id"
          render={(value) => {
            return <TextField strong value={`#${value}`} />;
          }}
        />
        <Table.Column dataIndex="media" title="Image" render={(_, record) => <ImageField value={record?.media[0]?.media_url} title={'Image content'} width={50} style={{ borderRadius: '1rem' }} />} />
        <Table.Column dataIndex="name" title="Title" width={200} />
        <Table.Column
          dataIndex="price"
          title="Price"
          render={(value) => {
            return <TextField value={`${value}đ`} />;
          }}
        />
        <Table.Column dataIndex="category" title="Category" render={(value) => <TagField color="cyan" value={value.name} />} />
        <Table.Column dataIndex="brand" title="Brand" />
        <Table.Column
          dataIndex="colorSizes"
          title="Color"
          render={(value) => {
            let array = createSetColor(value);
            return (
              <Space>
                {array?.map((item) => (
                  <TagField key={item?.id} value={item?.name} color={item?.hex_code} />
                ))}
              </Space>
            );
          }}
        />
        <Table.Column dataIndex="rating" title="Rating" render={(value) => <TagField color="lime" value={value} />} />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          fixed="right"
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
