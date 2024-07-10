import {Checkbox, Form, Input, Modal} from "antd";
import React, {useEffect, useId} from "react";
import {FieldType, AddModalProps} from "../type/type.interface";

const AddModal: React.FC<AddModalProps> = ({open, onCancel, onFinish, data }) => {
    const [form] = Form.useForm<FieldType>();
    const handleFinish = (values: FieldType) => {
        onFinish(values);
        form.resetFields();
    };
        useEffect(() => {
            if(data !== undefined) form.setFieldsValue(data)
    },[])

    return (
        <Modal
            forceRender={true}
            destroyOnClose={true}
            title="Add Task"
            open={open}
            onCancel={onCancel}
            onOk={form.submit}
            afterClose={form.resetFields}
        >
            <Form
                initialValues={{ isDone: false, id: useId(), time: new Date() }}
                form={form}
                onFinish={handleFinish}
            >
                <Form.Item<FieldType>
                    name="id"
                    hidden={true}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="isDone"
                    valuePropName="checked"
                    hidden={true}
                >
                    <Checkbox />
                </Form.Item>

                <Form.Item<FieldType>
                    name="task"
                    rules={[{ required: true, message: 'Please input the task!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="time"
                    hidden={true}
                >
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default AddModal;
