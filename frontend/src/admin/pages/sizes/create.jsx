import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from 'antd';

export const SizeCreate = () => {
  
  const { formProps, saveButtonProps } = useForm({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};