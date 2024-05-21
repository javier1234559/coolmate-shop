import { Edit, useForm } from '@refinedev/antd';
import MDEditor from '@uiw/react-md-editor';
import { Form, Input, Select, DatePicker, Switch } from 'antd';
import { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHODS } from '~/constants';

export const OrderEdit = () => {
  const { formProps, saveButtonProps, autoSaveProps } = useForm({
    warnWhenUnsavedChanges: true,
    autoSave: {
      enabled: true,
    },
  });

  const statusOptions = Object.entries(ORDER_STATUS).map(([key, value]) => ({
    label: value,
    value: value,
  }));

  const paymentOptions = Object.entries(PAYMENT_STATUS).map(([key, value]) => ({
    label: value,
    value: value,
  }));

  const paymentMethodOptions = Object.entries(PAYMENT_METHODS).map(([key, value]) => ({
    label: value.type,
    value: value,
  }));

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      autoSaveProps={autoSaveProps}
      deleteButtonProps={{
        disabled: true,
      }}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Shipping Address" name="shippingAddress">
          <Input />
        </Form.Item>

        <Form.Item label="Customer Note" name="noteFromCustomer">
          <MDEditor />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select options={statusOptions} />
        </Form.Item>

        <Form.Item label="Payment Status" name="paymentStatus">
          <Select options={paymentOptions} />
        </Form.Item>

        <Form.Item label="Payment Method" name="paymentMethod">
          <Select options={paymentMethodOptions} />
        </Form.Item>

        <Form.Item label="Total Price" name="totalPrice">
          <Input />
        </Form.Item>

        <Form.Item label="Is Paid?" name="isPaid">
          <Switch />
        </Form.Item>

        {/* <Form.Item label="Paid At" name="paidAt">
          <DatePicker />
        </Form.Item> */}

        <Form.Item label="Is Delivered?" name="isDelivered">
          <Switch />
        </Form.Item>

        {/* <Form.Item label="Delivered At" name="deliveredAt">
          <DatePicker />
        </Form.Item> */}
      </Form>
    </Edit>
  );
};
