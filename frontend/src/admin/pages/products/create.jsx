import { Create, useForm } from "@refinedev/antd";
import { Switch, Rate, Upload ,Button,Form, Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import MDEditor from "@uiw/react-md-editor";

export const ProductCreate = () => {
  const {  saveButtonProps } = useForm({
    warnWhenUnsavedChanges: true,
  });

  // const { selectProps: categorySelectProps } = useSelect({
  //   resource: "categories",
  // });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form layout="vertical">
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
    </Create>
  );
};