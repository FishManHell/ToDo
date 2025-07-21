export interface Todo {
    id: string;
    text: string;
    isEditable: boolean;
}

export interface ToDoCard {
    className?: string;
    todo: Todo,
    onRemove?: (id: string) => void;
    onEdit?: (id: string, newValue: string) => void;
}