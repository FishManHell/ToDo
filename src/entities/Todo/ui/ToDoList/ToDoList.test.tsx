import * as hooks from "shared/libs/hooks/useToDos/useToDos";
import {fireEvent, render, screen} from "@testing-library/react";
import {ToDoList} from "./ToDoList";

const mockTodos = [
    { id: "1", text: "todo 1", isEditable: false },
    { id: "2", text: "todo 2", isEditable: false },
];

describe("TodoList", () => {
    const onAddTodo = jest.fn();
    const onRemove = jest.fn();
    const onEdit = jest.fn();
    const onToggleEdit = jest.fn();
    const inputRef = { current: null };

    beforeEach(() => {
        jest.spyOn(hooks, "useToDos").mockReturnValue({
            todos: mockTodos,
            inputRef,
            onAddTodo,
            onRemove,
            onEdit,
            onToggleEdit,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("renders header, input, button and todos", () => {
        render(<ToDoList />);

        expect(screen.getByText("TODOLIST")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Adicione um item")).toBeInTheDocument();

        const button = screen.getByTestId("add-todo-btm");
        fireEvent.click(button);
        expect(onAddTodo).toHaveBeenCalledTimes(1);

        expect(screen.getAllByTestId("todo-input")).toHaveLength(mockTodos.length);
    });
})