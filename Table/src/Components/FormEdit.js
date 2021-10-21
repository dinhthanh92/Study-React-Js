import React, { Component, useState } from "react";
import { Button, Modal, Form, Input, Radio, InputNumber, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default class FormEdit extends Component {
    constructor(props){
        super(props)
        this.editData = this.editData.bind(this)
    }
    editData(key, keyss){
        this.props.editData(key, keyss)
    }
    render() {
        
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
        const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
            const [form] = Form.useForm();
            console.log(this.props.dataRow)
            return (
                <Modal
                    visible={visible}
                    title="Create a new collection"
                    okText="Create"
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
                        initialValues={{
                            user: this.props.dataRow
                            } 
                        }
                        validateMessages={validateMessages}
                    >
                        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]} value="USD" >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99, required: true }]} >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item name={['user', 'address']} label="Address" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Tags" rules={[{ required: true }]} initialValue='1'>
                        
                            <Form.List name={['user', 'tags']} rules={[{ required: true }]} className="Formlist" defaultValue="USD" >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
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
                                                    <Input defaultValue={field.name}  placeholder="Enter Tags ... " style={{ width: '60%' }} />
                                                </Form.Item>
                                                {fields.length > 0 ? (
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
        const CollectionsPage = () => {

            const onCreate = (values) => {
                this.editData(this.props.dataRow.key, values);
                this.props.clicksVisible();
                message.info('Edit Data successs')
            };

            return (
                <div> 
                    {this.props.children}
                    <CollectionCreateForm
                        visible={ this.props.setVisible }
                        onCreate={onCreate}
                        onCancel={() => {
                            this.props.clicksVisible();
                        }}
                    />
                </div>
            );
        };
        return (
            <CollectionsPage />
        )
    }
}