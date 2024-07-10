export interface FieldType {
    task: string;
    id: string;
    isDone: boolean;
    time: Date;
}

export interface AddModalProps {
    open: boolean;
    onCancel: () => void;
    onFinish: (values: FieldType) => void;
    data?: FieldType;
}
