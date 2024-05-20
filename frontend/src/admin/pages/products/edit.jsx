import { DeleteOutlined } from '@ant-design/icons';
import { Edit, useForm } from '@refinedev/antd';
import { useSelect } from '@refinedev/core';
import MDEditor from '@uiw/react-md-editor';
import { Button, Form, Input, InputNumber, Select, Space, Switch, Image, Upload } from 'antd';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API_URL } from '~/constants';
import axios from 'axios';

const { Option } = Select;

export const ProductEdit = () => {
  const [mediaUrls, setMediaUrls] = useState([]);
  const formRef = useRef(null);

  const handleUpload = async (index, options) => {
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
        console.log(index);
        handleChangeReviewImage(index, imageUrl);
        console.log('Form ref: ' + JSON.stringify(formRef.current.getFieldsValue(), null, 2));
        if (formRef.current) {
          formRef.current.setFieldsValue({
            [`${index}_image_url`]: imageUrl,
          });
        }
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Image upload failed: No path returned');
      }

      onSuccess(response);
    } catch (error) {
      toast.error('Failed to upload image');
      onError({ error });
    }
  };

  const { formProps, saveButtonProps, autoSaveProps } = useForm({
    warnWhenUnsavedChanges: true,
    autoSave: {
      enabled: true,
    },
  });

  const { options: categoryOptions } = useSelect({
    resource: 'categories',
    optionLabel: (item) => `${item.icon} ${item.name}`,
    optionValue: (item) => item.name,
  });

  const { options: colorOptions } = useSelect({
    resource: 'colors',
    optionLabel: (item) => `${item.name} (${item.hex_code})`,
    optionValue: (item) => item.name,
  });

  const { options: sizeOptions } = useSelect({
    resource: 'sizes',
    optionLabel: (item) => `${item.name}`,
    optionValue: (item) => item.name,
  });

  const handleChangeReviewImage = (index, url) => {
    setMediaUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls[index] = url;
      return newUrls;
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps} autoSaveProps={autoSaveProps}>
      <Form ref={formRef} {...formProps} layout="vertical">
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Brand" name="brand">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <MDEditor />
        </Form.Item>

        <Form.Item label="Slug" name="slug">
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Is Active" name="is_active" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Category" name={['category', 'name']}>
          <Select>
            {categoryOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="media">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field, index) => (
                  <Space
                    key={index}
                    direction="horizontal"
                    style={{
                      position: 'relative',
                      marginRight: '50%',
                    }}>
                    {mediaUrls[index] && (
                      <Space style={{ margin: '10px', alignItems: 'center' }}>
                        <Image width={80} src={mediaUrls[index]} />
                      </Space>
                    )}
                    <Form.Item {...field} label="Media Type" name={[`${field.name}`, 'media_type']}>
                      <Select>
                        {['image', 'video'].map((type) => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item {...field} label="Media Url" name={[`${field.name}`, 'media_url']}>
                      <Input onChange={(e) => handleChangeReviewImage(index, e.target.value)} />
                    </Form.Item>

                    <Upload.Dragger listType="picture" name="avatar" customRequest={(options) => handleUpload(index, options)} showUploadList={false}>
                      Upload
                    </Upload.Dragger>
                    <Button danger onClick={() => remove(field.name)} style={{ marginTop: '5px' }} icon={<DeleteOutlined />} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" block onClick={() => add()}>
                    Add a new Media
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>

        <Form.List name="colorSizes">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    direction="horizontal"
                    style={{
                      position: 'relative',
                      marginRight: '50%',
                    }}>
                    <Form.Item {...field} label="Color" name={[field.name, 'color', 'name']}>
                      <Select>
                        {colorOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item {...field} label="Size" name={[field.name, 'size', 'name']}>
                      <Select>
                        {sizeOptions.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item {...field} label="Quantity" name={[field.name, 'quantity']}>
                      <InputNumber />
                    </Form.Item>
                    <Button danger onClick={() => remove(field.name)} style={{ marginTop: '5px' }} icon={<DeleteOutlined />} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" block onClick={() => add()}>
                    Add a new Color and Size
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </Form>
    </Edit>
  );
};
