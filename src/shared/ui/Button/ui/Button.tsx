import cls from "./Button.module.scss"
import classNames from "classnames";
import {ButtonHTMLAttributes} from "react";

export enum ButtonTheme {
    CLEAR = "clear",
    OUTLINE = "outline",
    OUTLINE_RED = "outline-red",
    BACKGROUND = "background",
}

export enum ButtonSize {
    M = "size-m",
    L = "size-l",
    XL = "size-xl"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string;
    size?: ButtonSize;
    theme?: ButtonTheme;
    square?: boolean;
    disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {className, children, size = ButtonSize.L, theme = ButtonTheme.OUTLINE, square, disabled, ...otherProps} = props;

    const mods = {
        [cls[size]]: true,
        [cls[theme]]: true,
        [cls.square]: square,
        [cls.disabled]: disabled
    }

    return (
        <button className={classNames(cls["button"], className, mods)} disabled={disabled} {...otherProps}>
            {children}
        </button>
    );
};
