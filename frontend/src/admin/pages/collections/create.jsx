import { PlusOutlined } from "@ant-design/icons";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload ,Image} from 'antd';
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "~/constants";

export const CollectionCreate = () => {
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
      <Form {...formProps} layout="vertical">
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

        <Form.Item label="Image Source" name="imageSrc">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Slug" name="slug">
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};