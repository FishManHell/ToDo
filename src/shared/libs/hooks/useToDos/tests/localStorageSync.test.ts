import { renderHook, act } from "@testing-library/react";
import { useToDos } from "shared/libs/hooks";
import { InputRef } from "shared/ui/Input";
import { MutableRefObject } from "react";

describe("useToDos localStorage", () => {
    const LOCAL_STORAGE_TODO_KEY = "todos";

    beforeEach(() => {
        Storage.prototype.setItem = jest.fn();
    });

    test("add to localStorage", () => {
        const { result } = renderHook(() => useToDos());

        const inputMock: InputRef = {
            getValue: jest.fn().mockReturnValue("Test Todo"),
            clear: jest.fn(),
            focus: jest.fn(),
        };

        const inputRef = result.current.inputRef as MutableRefObject<InputRef | null>;
        act(() => (inputRef.current = inputMock));

        act(() => result.current.onAddTodo());

        const calls = (localStorage.setItem as jest.Mock).mock.calls;
        const lastCall = calls[calls.length - 1];
        expect(lastCall).toEqual([LOCAL_STORAGE_TODO_KEY, JSON.stringify(result.current.todos),]);
    });

    test("edit in localStorage", () => {
        const { result } = renderHook(() => useToDos());

        act(() => result.current.todos.push({ id: "1", text: "First", isEditable: false }));

        act(() => result.current.onToggleEdit("1"));

        const calls = (localStorage.setItem as jest.Mock).mock.calls;
        const lastCall = calls[calls.length - 1];
        expect(lastCall).toEqual([
            LOCAL_STORAGE_TODO_KEY,
            JSON.stringify(result.current.todos),
        ]);
    });
});
