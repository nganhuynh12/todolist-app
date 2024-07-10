import {Button, Form, ModalProps} from "antd";
import React, { useState } from "react";
import AddModal from "./AddModal";
import { FieldType, AddModalProps } from "../type/type.interface";

const AddButtonDown: React.FC<Pick<AddModalProps, "onFinish">> = ({ onFinish }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<FieldType>();

    const handleFinish = (values: FieldType) => {
        onFinish(values);
        setIsModalOpen(false);
        form.resetFields();
    };

    return (
        <>
            <Button
                type="primary"
                size="large"
                onClick={() => setIsModalOpen(true)}
            >
                Add Task
            </Button>
            {
                isModalOpen && <AddModal
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    onFinish={handleFinish}
                />
            }
        </>
    );
};

export default AddButtonDown;
