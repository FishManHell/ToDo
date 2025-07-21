import {Todo} from "entities/Todo";
import {RefObject, useCallback, useEffect, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {InputRef} from "shared/ui/Input";


const LOCAL_STORAGE_TODO_KEY = "todos";

interface UseToDosResult {
    todos: Todo[];
    inputRef: RefObject<InputRef>;
    onRemove: (id: string) => void;
    onEdit: (id: string, newValue: string) => void;
    onAddTodo: () => void;
    onToggleEdit: (id: string) => void;
}

export const useToDos = (): UseToDosResult => {
    const [todos, setToDos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_TODO_KEY);
        return saved ? JSON.parse(saved) as Todo[] : []
    });

    const inputRef = useRef<InputRef>(null);

    const onRemove = useCallback((id: string) => {
        setToDos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    const onEdit = useCallback((id: string, newValue: string) => {
        setToDos(prev => prev.map(todo => todo.id === id ? {...todo, text: newValue} : todo))
    }, []);

    const onAddTodo = useCallback(() => {
        const value = inputRef.current?.getValue();
        if (!value) return
        setToDos(prev => {
            const isHasToDo = prev.some(({text}) => text === value);

            if (!isHasToDo) {
                return [...prev, {id: uuidv4(), text: value, isEditable: false}];
            }
            return prev
        })
        inputRef.current?.clear()
    }, []);

    const onToggleEdit = useCallback((id: string) => {
        setToDos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, isEditable: !todo.isEditable }
                    : { ...todo, isEditable: false }
            )
        );
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_TODO_KEY, JSON.stringify(todos));
    }, [todos]);

    return {todos, inputRef, onRemove, onEdit, onAddTodo, onToggleEdit};
}