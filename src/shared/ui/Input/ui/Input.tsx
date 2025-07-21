import cls from "./Input.module.scss"
import classNames from "classnames";
import {ChangeEvent, forwardRef, InputHTMLAttributes, memo, useEffect, useImperativeHandle, useRef} from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export enum InputTheme {
    CLEAR = "clear",
}

interface InputProps extends HTMLInputProps{
    className?: string;
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    theme?: InputTheme;
    isEditable?: boolean;
}

export interface InputRef {
    focus: () => void;
    clear: () => void;
    getValue: () => string;
}


export const Input = memo(forwardRef<InputRef, InputProps>((props, ref ) => {
    const {
        className, value, onChange,
        type = 'text', placeholder, readonly,
        theme = InputTheme.CLEAR, isEditable,
        ...otherProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    const mods = {[cls["is_editable"]]: isEditable, [cls[theme]]: theme}

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus(),
        clear: () => {
            if (inputRef.current) inputRef.current.value = "";
        },
        getValue: () => inputRef.current?.value.trim() || "",
    }));

    useEffect(() => {
       if (!readonly && inputRef.current) {
           inputRef.current.focus()
       }
    }, [readonly, ref]);


    return (
        <div className={classNames(cls["input-container"], className)}>
            <input
                ref={inputRef}
                value={value}
                type={type}
                onChange={onChangeHandler}
                className={classNames(cls["input"], mods)}
                placeholder={placeholder}
                readOnly={readonly}
                {...otherProps}
            />
        </div>
    );
}));

Input.displayName = "Input";
