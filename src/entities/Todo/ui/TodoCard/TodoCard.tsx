import cls from "./TodoCard.module.scss"
import classNames from "classnames";
import {ToDoCard} from "entities/Todo";
import {memo, useCallback, useState} from "react";
import {Input} from "shared/ui/Input";
import {InputContainer} from "shared/ui/InputContainer";
import {Button} from "shared/ui/Button";
import CancelIcon from "shared/assets/icons/cross.svg";
import EditIcon from "shared/assets/icons/pencil.svg";
import DeleteIcon from "shared/assets/icons/trash.svg";
import SaveIcon from "shared/assets/icons/save.svg"
import {ButtonTheme} from "shared/ui/Button/ui/Button";

interface TodoCardProps extends ToDoCard {
    onToggleEdit?: (id: string) => void;
}

export const TodoCard = memo((props: TodoCardProps) => {
    const {className, todo, onRemove, onEdit, onToggleEdit} = props;
    const [editValue, setEditValue] = useState<string>(todo.text);

    const btnTheme = ButtonTheme.CLEAR;

    const onChangeInputValue = useCallback((value: string) => {
        setEditValue(value)
    }, [])

    const onEditHandler = () => {
        onToggleEdit?.(todo.id)
        const trimmedValue = editValue.trim();
        if (trimmedValue && trimmedValue !== todo.text) onEdit?.(todo.id, trimmedValue);
    }

    const onRemoveHandler = () => onRemove?.(todo.id)

    const onDiscardHandler = () => {
        onToggleEdit?.(todo.id)
        if (editValue && editValue !== todo.text) {
            setEditValue(todo.text)
        }
    }

    return (
        <InputContainer className={classNames(cls["todo-card"], className)}>
            <Input
                data-testid={"todo-input"}
                value={editValue}
                onChange={onChangeInputValue}
                readonly={!todo.isEditable}
                className={cls["todo-card-input"]}
                isEditable={todo.isEditable}
            />
            <Button
                data-testid={"edit-save-btn"}
                className={cls["todo-card-btn"]}
                theme={btnTheme}
                onClick={onEditHandler}>
                {!todo.isEditable ? <EditIcon/> : <SaveIcon/>}
            </Button>
            {todo.isEditable &&
                <Button
	                data-testid={"cancel-save-btn"}
                    className={cls["todo-card-btn"]}
                    theme={btnTheme}
                    onClick={onDiscardHandler}
                ><CancelIcon/>
                </Button>}
            <Button
                data-testid={"remove-btn"}
                className={cls["todo-card-btn"]}
                theme={btnTheme}
                onClick={onRemoveHandler}
            ><DeleteIcon/>
            </Button>
        </InputContainer>
    );
});
