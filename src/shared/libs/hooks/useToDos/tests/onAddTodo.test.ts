import {InputRef} from "shared/ui/Input";
import {act, renderHook} from "@testing-library/react";
import {useToDos} from "shared/libs/hooks";
import {MutableRefObject} from "react";
import {v4 as uuidv4} from "uuid";

jest.mock("uuid", () => ({ v4: jest.fn() }));


describe('onAddTodo', () => {
    beforeEach(() => {
        localStorage.clear();
        (uuidv4 as jest.Mock).mockReturnValue("mock-id");
    });


    test("onAddTodo should add a new", () => {
        const inputMock: InputRef = {
            getValue: jest.fn().mockReturnValue("New Todo"),
            clear: jest.fn(),
            focus: jest.fn(),
        };
        const { result } = renderHook(() => useToDos());
        const inputRef = result.current.inputRef as MutableRefObject<InputRef | null>;
        act(() => inputRef.current = inputMock);
        act(() => result.current.onAddTodo());
        expect(result.current.todos).toEqual([{ id: "mock-id", text: "New Todo", isEditable: false }]);
        expect(inputMock.clear).toHaveBeenCalled();
    });

    test("try to add duplicate todos", () => {
        const inputMock: InputRef = {
            getValue: jest.fn().mockReturnValue("Duplicate"),
            clear: jest.fn(),
            focus: jest.fn(),
        };

        const { result } = renderHook(() => useToDos());
        const inputRef = result.current.inputRef as MutableRefObject<InputRef | null>;
        act(() => inputRef.current = inputMock);
        act(() => result.current.onAddTodo());
        act(() => result.current.onAddTodo());
        expect(result.current.todos).toHaveLength(1);
    });

    test("test empty field", () => {
        const inputMock: InputRef = {
            getValue: jest.fn().mockReturnValue(""),
            clear: jest.fn(),
            focus: jest.fn(),
        };

        const { result } = renderHook(() => useToDos());
        const inputRef = result.current.inputRef as MutableRefObject<InputRef | null>;
        act(() => inputRef.current = inputMock);
        act(() => result.current.onAddTodo());
        expect(result.current.todos).toHaveLength(0);
        expect(inputMock.clear).not.toHaveBeenCalled();
    });
})