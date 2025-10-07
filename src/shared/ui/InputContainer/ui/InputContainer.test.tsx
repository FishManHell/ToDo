import {render, screen} from "@testing-library/react";
import {InputContainer} from "./InputContainer";

describe('InputContainer', () => {
    test('render children', () => {
        render(
            <InputContainer>
                <div data-testid="child" />
            </InputContainer>
        );

        const child = screen.getByTestId('child');
        expect(child).toBeInTheDocument();
    });
});