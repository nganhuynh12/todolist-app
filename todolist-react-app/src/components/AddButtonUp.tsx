import { Button, Form } from "antd";
import React, { useState } from "react";
import AddModal from "./AddModal";
import { FieldType, AddModalProps } from "../type/type.interface";

const AddButtonUp: React.FC<Pick<AddModalProps, "onFinish">> = ({ onFinish }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFinish = (values: FieldType) => {
        onFinish(values);
        setIsModalOpen(false);
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

export default AddButtonUp;
