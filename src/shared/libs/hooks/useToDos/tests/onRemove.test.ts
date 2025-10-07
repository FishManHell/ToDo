import {act, renderHook} from "@testing-library/react";
import {useToDos} from "shared/libs/hooks";

describe("onRemove", () => {
    test("remove todo item", () => {
        const { result } = renderHook(() => useToDos());
        act(() => result.current.todos.push({ id: "1", text: "Test Todo", isEditable: false }));
        expect(result.current.todos).toHaveLength(1);
        act(() => result.current.onRemove("1"));
        expect(result.current.todos).toHaveLength(0);
    });

    test("does not exist item", () => {
        const { result } = renderHook(() => useToDos());
        act(() => result.current.todos.push({ id: "1", text: "Test Todo", isEditable: false }));
        expect(result.current.todos).toHaveLength(1);

        act(() => result.current.onRemove("2")); // несуществующий id
        expect(result.current.todos).toHaveLength(1);
    });
})