import React, {useEffect, useState} from "react";
import { Button, Checkbox, Form, Input, Modal, Select } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { clsx } from 'clsx';
import AddButtonUp from "../components/AddButtonUp";
import AddButtonDown from "../components/AddButtonDown";
import {FieldType} from "../type/type.interface";
import AddModal from "../components/AddModal";
import dayjs from "dayjs";

function Todolist() {
    const [todos, setTodos] = useState<FieldType[]>([]);
    const [form] = Form.useForm();
    const [editForm, setEditForm] = useState<FieldType>();
    const [open, setOpen] = useState(false);


    const handleFinish = (values: FieldType) => {
        setTodos(prevState => [...prevState, values]);
        form.resetFields();
    };

    const handelDelete = (id: string) => {
        const newTodos = todos.filter(todoItem => todoItem.id !== id);
        setTodos(newTodos);
    }

    const handelEdit = (values: FieldType) => {
        setEditForm(values);
        setOpen(true);
    }

    const handelCancel = () => {
        setEditForm(undefined)
        setOpen(false)
    }

    const ChangeValueEdit = (values: FieldType) => {
        const newTodos = todos.map(todoItem => todoItem.id === values.id ? values : todoItem);
        setTodos(newTodos);
        setOpen(false);
    }

    const handelMarkAsDone = (id: string, e: any) => {
        const newTodos = todos.map(todoItem => todoItem.id === id ? {...todoItem, isDone: e.target.checked} : todoItem);
        setTodos(newTodos);
    }

    const handleSortDate = (value: String) => {
        const sortedTodos = [...todos].sort((a, b) => {
            const dateA: dayjs.Dayjs = dayjs(a.time);
            const dateB: dayjs.Dayjs = dayjs(b.time);
            if (value === 'asc') {
                return dateA.isAfter(dateB) ? 1 : -1;
            } else {
                return dateA.isBefore(dateB) ? 1 : -1;
            }
        });
        setTodos(sortedTodos);
    };

    return (
        <>
            <div className="flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-screen-lg">
                    <h1 className="text-5xl font-bold mb-4 text-center">TODO LIST</h1>
                    <div className='flex justify-between my-4'>
                        <AddButtonUp onFinish={handleFinish}/>
                        <Select
                            placeholder="ASC"
                            defaultValue={'asc'}
                            style={{ width: 200 }}
                            onChange={handleSortDate}
                            options={[
                                {
                                    label: 'Asc',
                                    value: 'asc'
                                },
                                {
                                    label: 'Desc',
                                    value: 'desc'
                                },
                            ]}
                        />
                    </div>
                    <div className={clsx('p-10 rounded-md', {'bg-slate-300': todos.length > 0})}>
                        <ul className="list-disc pl-7 bg-white rounded-md">
                            {todos.map(todoItem => (
                                <li key={todoItem.id} className="flex justify-between items-center p-3">
                                    <div className="flex items-center">
                                        <Checkbox
                                            className='mr-4'
                                            onChange={(e) => handelMarkAsDone(todoItem.id,e)}
                                        />
                                        <div>
                                        <span className={clsx('font-bold text-l',
                                            {'line-through': todoItem.isDone}
                                        )}>
                                            {todoItem.task}
                                        </span>
                                            <p className={clsx('font-bold text-l',
                                            )}>
                                                {dayjs(todoItem.time).format('YYYY-MM-DD HH:mm:ss')}
                                        </p>
                                        </div>
                                    </div>
                                    <div>
                                        <Button className='mr-2' icon={<EditOutlined/>}
                                                onClick={() => handelEdit(todoItem)}/>
                                        <Button icon={<DeleteOutlined/>} onClick={() => handelDelete(todoItem.id)}/>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <AddModal open={open} onCancel={handelCancel} onFinish={(values) => ChangeValueEdit(values)} data={editForm} />
                </div>
            </div>
            {open && <AddModal open={open} onCancel={handelCancel} onFinish={(values) => ChangeValueEdit(values)} data={editForm} />}
        </>
    );
}

export default Todolist;
