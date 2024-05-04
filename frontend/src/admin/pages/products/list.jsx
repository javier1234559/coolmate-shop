import { List, Breadcrumb, TextField, TagField, ImageField, useTable, EditButton, ShowButton } from '@refinedev/antd';
import { useMany } from '@refinedev/core';
import { usePermissions } from '@refinedev/core';
import { Table, Space } from 'antd';

export const ProductList = () => {
  const { data: permissionsData } = usePermissions();
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
    <List title="Here's a product manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'large' }}>
      <Table {...tableProps} scroll={{ x: 'max-content' }} rowKey="id">
        <Table.Column
          dataIndex="id"
          title="ID#"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return <TextField value={`#${value}`} />;
          }}
        />
        <Table.Column dataIndex="media" title="Image" render={(_, record) => <ImageField value={record?.media[0]?.media_url} title={'Image content'} width={50} style={{ borderRadius: '1rem' }} />} />
        <Table.Column dataIndex="name" title="Title" width={200} />
        <Table.Column dataIndex="description" title="Description" width={300} />
        <Table.Column
          dataIndex="price"
          title="Price"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return <TextField value={`${value}đ`} />;
          }}
        />
        <Table.Column dataIndex="brand" title="Category" render={(value) => <TagField color="cyan" value={value} />} />
        <Table.Column dataIndex="brand" title="Brand" />
        <Table.Column
          dataIndex="colorSizes"
          title="Color"
          render={(value) => (
            <Space>
              {value?.map((item) => (
                <TagField key={item?.id} value={item?.color?.name} color={item?.color?.hex_code} />
              ))}
            </Space>
          )}
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
