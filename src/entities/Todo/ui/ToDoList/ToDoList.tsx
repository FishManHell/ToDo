import cls from "./ToDoList.module.scss"
import classNames from "classnames";
import {useToDos} from "shared/libs/hooks";
import {TodoCard} from "../TodoCard/TodoCard";
import ArrowIcon from "shared/assets/icons/arrow_right.svg"
import {Button} from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import {ButtonTheme} from "shared/ui/Button/ui/Button";
import {InputContainer} from "shared/ui/InputContainer";
import {useMemo} from "react";

interface ToDoListProps {
    className?: string;
}

export const ToDoList = ({className}: ToDoListProps) => {
    const {todos, inputRef, onAddTodo, onRemove, onEdit, onToggleEdit} = useToDos();

    const containerStyle = useMemo(() => ({
        bottom: `-${todos.length > 0 ? (todos.length - 1) * 60 : 60}px`
    }), [todos.length]);

    return (
        <div className={classNames(cls["todo-list"], {}, [className])}>
            <div className={cls['todo-list-input-wrapper']}>
                <header className={cls["todo-list-input-wrapper-header"]}>
                    <h1>TODOLIST</h1>
                </header>
                <InputContainer>
                    <Input
                        data-testid={"todos-input"}
                        placeholder={"Adicione um item"}
                        className={cls["todo-list-input"]}
                        ref={inputRef}
                    />
                    <Button
                        data-testid={"add-todo-btm"}
                        className={cls["todo-list-input-btn"]}
                        onClick={onAddTodo}
                        theme={ButtonTheme.CLEAR}
                    >
                        <ArrowIcon/>
                    </Button>
                </InputContainer>
                <section className={cls['todos-container']} style={containerStyle}>
                    {todos.map(todo => (
                        <TodoCard
                            todo={todo}
                            onRemove={onRemove}
                            onEdit={onEdit}
                            key={todo.id}
                            className={cls['todo-card']}
                            onToggleEdit={onToggleEdit}
                        />
                    ))}
                </section>
            </div>
        </div>
    );
};
