import { List, Breadcrumb, useTable, EditButton, ShowButton, BooleanField } from '@refinedev/antd';
import { usePermissions } from '@refinedev/core';
import { Table, Space, Tag } from 'antd';
import { PAYMENT_METHOD_COLOR, PAYMENT_STATUS_COLOR, STATUS_COLOR } from '~/constants';

export const OrderList = () => {
  const { data: permissionsData } = usePermissions();
  const { tableProps } = useTable({ resource: 'orders' });

  return (
    <List title="Here's a order manager" breadcrumb={<Breadcrumb showHome={true} />} canCreate={permissionsData?.includes('admin')} createButtonProps={{ size: 'medium' }}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="#Id" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="phone" title="Phone" />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column dataIndex="shippingAddress" title="Shipping Address" />
        <Table.Column dataIndex="noteFromCustomer" title="Customer Note" />
        <Table.Column dataIndex="status" title="Status" render={(status) => <Tag color={STATUS_COLOR[status]}>{status}</Tag>} />
        <Table.Column dataIndex="paymentStatus" title="Payment Status" render={(paymentStatus) => <Tag color={PAYMENT_STATUS_COLOR[paymentStatus]}>{paymentStatus}</Tag>} />
        <Table.Column dataIndex="paymentMethod" title="Payment Method" render={(paymentMethod) => <Tag color={PAYMENT_METHOD_COLOR[paymentMethod]}>{paymentMethod}</Tag>} />
        <Table.Column dataIndex="totalPrice" title="Total Price" />
        <Table.Column dataIndex="isPaid" title="Is Paid?" render={(isPaid) => <BooleanField value={isPaid} />} />
        <Table.Column dataIndex="paidAt" title="Paid At" />
        <Table.Column dataIndex="isDelivered" title="Is Delivered?" render={(isDelivered) => <BooleanField value={isDelivered} />} />
        <Table.Column dataIndex="deliveredAt" title="Delivered At" />
        <Table.Column dataIndex="created_at" title="Created At" sorter={(a, b) => new Date(a.created_at) - new Date(b.created_at)} />
        <Table.Column dataIndex="modified_at" title="Modified At" sorter={(a, b) => new Date(a.modified_at) - new Date(b.modified_at)} />
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
