import {render, screen, fireEvent} from "@testing-library/react";
import {Button, ButtonSize, ButtonTheme} from "../ui/Button";

describe('Button component', () => {
    test('get children', () => {
        render(<Button>Button</Button>);
        expect(screen.getByText("Button")).toBeInTheDocument();
    })

    test("test theme props", () => {
        render(<Button theme={ButtonTheme.CLEAR}>Test</Button>);
        const button = screen.getByText("Test");
        expect(button).toHaveClass("clear");
    });

    test("test size props", () => {
        render(<Button size={ButtonSize.L}>Test</Button>);
        const button = screen.getByText("Test");
        expect(button).toHaveClass("size-l");
    });

    test("test square props", () => {
        render(<Button square>Test</Button>);
        const button = screen.getByText("Test");
        expect(button).toHaveClass("square");
    });

    test("test disable props", () => {
        render(<Button disabled>Test</Button>);
        const button = screen.getByText("Test");
        expect(button).toHaveClass("disabled");
    });

    test("test disable props", () => {
        render(<Button disabled>Test</Button>);
        const button = screen.getByText("Test");
        expect(button).toHaveClass("disabled");
    });

    test("test onClick", () => {
        const handleClick = jest.fn();
        const { getByText } = render(<Button onClick={handleClick}>Click</Button>);

        fireEvent.click(getByText('Click'));

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

})