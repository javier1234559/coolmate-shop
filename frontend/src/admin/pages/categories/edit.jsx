import { Edit, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';

export const CategoryEdit = () => {
  const { formProps, saveButtonProps, autoSaveProps } = useForm({
    warnWhenUnsavedChanges: true,
    autoSave: {
      enabled: true,
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Icon" name="icon">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
