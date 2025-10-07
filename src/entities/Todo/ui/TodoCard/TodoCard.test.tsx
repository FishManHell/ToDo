import {fireEvent, render, screen} from "@testing-library/react";
import {TodoCard} from "./TodoCard";

const todoItem = {id: "1234", text: "hello", isEditable: false}
const editableItem = {id: "1234", text: "hello", isEditable: true}

describe("TodoCard", () => {
      test('render component', () => {
          render(<TodoCard todo={todoItem} />)
          const card = screen.getByDisplayValue('hello');
          expect(card).toBeInTheDocument();
      });

    test("test onEdit", () => {
        const onEdit = jest.fn();
        render(<TodoCard todo={todoItem} onEdit={onEdit} />);

        const input = screen.getByTestId("todo-input");
        const button = screen.getByTestId('edit-save-btn');
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'hello world' } });
        fireEvent.click(button);

        expect(onEdit).toHaveBeenCalledTimes(1);
        expect(onEdit).toHaveBeenCalledWith('1234', 'hello world');
    });

    test("test onRemove", () => {
        const onRemove = jest.fn();
        render(<TodoCard todo={todoItem} onRemove={onRemove} />);
        const button = screen.getByTestId('remove-btn');
        fireEvent.click(button);

        expect(onRemove).toHaveBeenCalledTimes(1);
        expect(onRemove).toHaveBeenCalledWith('1234');
    });

    test("test onToggleEdit", () => {
        const onToggleEdit = jest.fn();
        render(<TodoCard todo={todoItem} onToggleEdit={onToggleEdit} />);
        const button = screen.getByTestId('edit-save-btn');
        fireEvent.click(button);

        expect(onToggleEdit).toHaveBeenCalledTimes(1);
        expect(onToggleEdit).toHaveBeenCalledWith('1234');
    });

    test("test isEditable", () => {
        const onToggleEdit = jest.fn();
        const onEdit = jest.fn();

        render(<TodoCard todo={editableItem} onToggleEdit={onToggleEdit} onEdit={onEdit}/>);

        const input = screen.getByTestId("todo-input");
        const button = screen.getByTestId("edit-save-btn");

        expect(input).not.toHaveAttribute("readonly");
        fireEvent.change(input, { target: { value: "hello world" } });
        fireEvent.click(button);

        expect(onToggleEdit).toHaveBeenCalledTimes(1);
        expect(onToggleEdit).toHaveBeenCalledWith("1234");

        expect(onEdit).toHaveBeenCalledTimes(1);
        expect(onEdit).toHaveBeenCalledWith("1234", "hello world");
    });
  })