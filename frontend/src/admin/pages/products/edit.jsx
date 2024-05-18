import { Edit, useForm } from '@refinedev/antd';
import { UploadOutlined } from '@ant-design/icons';
import MDEditor from '@uiw/react-md-editor';
import { Switch, Rate, Upload ,Button,Form, Input} from 'antd';

export const ProductEdit = () => {
  const { formProps, saveButtonProps, queryResult, autoSaveProps } = useForm({
    warnWhenUnsavedChanges: true,
    autoSave: {
      enabled: true,
    },
  });

  const productData = queryResult?.data?.data;
  console.log(productData);

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Seller Id" name="seller_id">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Brand" name="brand">
          <Input />
        </Form.Item>

        <Form.Item label="Is Active" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <Rate />
        </Form.Item>

        <Form.Item label="Slug" name="slug">
          <Input />
        </Form.Item>

        <Form.Item label="Media" name="media">
          <Upload><Button icon={<UploadOutlined />}>Upload</Button></Upload>
        </Form.Item>

        <Form.Item label="Description" name="description">
        <MDEditor  />
        </Form.Item>
      </Form>
    </Edit>
  );
};
