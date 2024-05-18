import { Create, useForm } from '@refinedev/antd';
import { Upload, Form, Input, Select, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { API_URL } from '~/constants';
import axios from 'axios';
import { useRef, useState } from 'react';

const { Option } = Select;

export const UserCreate = () => {
  const [avatarImg, setAvatarImg] = useState('');
  const formRef = useRef(null);

  const handleUpload = async (options) => {
    const { onSuccess, onError, file } = options;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.path) {
        const imageUrl = response.data.path;
        setAvatarImg(imageUrl);
        toast.success('Image uploaded successfully');
      
        if (formRef.current) {
          formRef.current.setFieldsValue({
            avatar_img: imageUrl,
          });
        }
      } else {
        toast.error('Image upload failed: No path returned');
      }

      onSuccess(response);
    } catch (error) {
      toast.error('Failed to upload image');
      onError({ error });
    }
  };

  const { formProps, saveButtonProps } = useForm({
    warnWhenUnsavedChanges: true,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" ref={formRef}>
        <Upload name="avatar" customRequest={handleUpload} listType="picture-card" showUploadList={false}>
          {avatarImg ? (
            <Image width={200} src={avatarImg} />
          ) : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          )}
        </Upload>

        <Form.Item label="Avatar" name="avatar_img">
          <Input readOnly />
        </Form.Item>

        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
        <Input.Password />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>

        <Form.Item label="Addresses" name="addresses">
          <Input />
        </Form.Item>

        <Form.Item label="Role" name="role">
          <Select placeholder="Select a role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>
      </Form>
    </Create>
  );
};
