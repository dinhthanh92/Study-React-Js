import React, { Component, useState } from "react";

import 'antd/dist/antd.css';
import "./Forms.css"

import { Button, Modal, Form, Input, InputNumber, message } from 'antd';

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const Forms = (props: any) => {
  
    const validateMessages = {
      required: 'This is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    const CollectionCreateForm = ({ visible, onCreate, onCancel }: any) => {
      const [form] = Form.useForm();
      return (
        <Modal
          visible={visible}
          title="Add new people"
          okText="Add new"
          cancelText="Cancel"
          onCancel={onCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onCreate(values);
              })
              .catch((info) => {
                console.log('Validate Failed:', info);
              });
          }}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={
              {
                user: {
                  tags: ['']
                }
              }
            }
            validateMessages={validateMessages}
          >
            <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99, required: true }]} >
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'address']} label="Address" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tags" rules={[{ required: true }]}>
              
              <Form.List name={['user', 'tags']}  >
                {(fields, { add, remove }, { errors }) => (
                  
                  <>
                    { 
                    fields.map((field, index) => (
                      <Form.Item

                        required={true}
                        key={field.key}
                      >
                         
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          rules={[
                            {
                              required: true,
                              whitespace: true
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="Enter Tags" style={{ width: '60%' }} />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                      >
                        Add Tags
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Form>
        </Modal>
      );
    };

    const Forms = () => {
      const [visible, setVisible] = useState(false);

      const onCreate = (values: any) => {
        props.data(values)
        message.info('Add Data successs')
        setVisible(false);
      };

      return (
        <div>

          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            New Data
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
      );
    };

    return (
      <div className="FormsMain">
        <Forms ></Forms>
      </div>
    )
  
}
export default Forms