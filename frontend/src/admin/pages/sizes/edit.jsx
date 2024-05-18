import { Edit, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';

export const SizeEdit = () => {
  const { formProps, saveButtonProps, autoSaveProps } = useForm({
    warnWhenUnsavedChanges: true,
    autoSave: {
      enabled: true,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};