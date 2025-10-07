import {fireEvent, render, screen} from "@testing-library/react";
import {Input, InputTheme} from "./Input";


describe('Input component', () => {
    test('get value', () => {
        render(<Input value="Hello" />);
        const input = screen.getByDisplayValue('Hello');
        expect(input).toBeInTheDocument();
    });

    test("test onChange", () => {
        const handleChange = jest.fn();
        render(<Input value="" onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Hello' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith('Hello');
    });

    test('test theme', () => {
        render(<Input theme={InputTheme.CLEAR} />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass("clear");
    })

    test('test type', () => {
        render(<Input type={'password'} value={""} data-testid="my-input"/>);
        const input = screen.getByTestId('my-input');
        expect(input).toHaveAttribute('type', 'password');
    })

    test('test placeholder', () => {
        render(<Input placeholder={"write here"} data-testid="my-input"/>);
        const input = screen.getByTestId('my-input');
        expect(input).toHaveAttribute('placeholder', 'write here');
    })

    test('test is_editable class', () => {
        render(<Input isEditable />);
        const input = screen.getByRole('textbox');
        expect(input).toHaveClass("is-editable");
    })

    test('test readonly', () => {
        render(<Input readonly data-testid="my-input"/>);
        const input = screen.getByTestId('my-input') as HTMLInputElement
        expect(input).toHaveAttribute("readonly");
        expect(input.readOnly).toBe(true);
    })


})