import {act, renderHook} from "@testing-library/react";
import {useToDos} from "shared/libs/hooks";

describe('onToggleEdit()', () => {
    it('test onToggleEdit', () => {
        const initialTodos = [
            { id: '1', text: 'First', isEditable: false },
            { id: '2', text: 'Second', isEditable: false },
            { id: '3', text: 'Third', isEditable: false },
        ];
        const { result } = renderHook(() => useToDos());
        act(() => result.current.onAddTodo());

        act(() => result.current.todos.splice(0, result.current.todos.length, ...initialTodos));
        act(() => result.current.onToggleEdit('1'));

        expect(result.current.todos.find(t => t.id === '1')?.isEditable).toBe(true);
        expect(result.current.todos.find(t => t.id === '2')?.isEditable).toBe(false);
        expect(result.current.todos.find(t => t.id === '3')?.isEditable).toBe(false);

        act(() => result.current.onToggleEdit('1'));

        expect(result.current.todos.find(t => t.id === '1')?.isEditable).toBe(false);
        expect(result.current.todos.find(t => t.id === '2')?.isEditable).toBe(false);
        expect(result.current.todos.find(t => t.id === '3')?.isEditable).toBe(false);

        act(() => result.current.onToggleEdit('2'));

        expect(result.current.todos.find(t => t.id === '1')?.isEditable).toBe(false);
        expect(result.current.todos.find(t => t.id === '2')?.isEditable).toBe(true);
        expect(result.current.todos.find(t => t.id === '3')?.isEditable).toBe(false);
    });
})