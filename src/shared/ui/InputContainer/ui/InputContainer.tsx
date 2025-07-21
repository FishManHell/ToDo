import cls from "./InputContainer.module.scss"
import {ReactNode} from "react";
import classNames from "classnames";

interface InputWrapperProps {
    className?: string;
    children: ReactNode;
}

export const InputContainer = (props: InputWrapperProps) => {
    const {children, className} = props
    return (
        <div className={classNames(cls["input-container"], className)}>
            {children}
        </div>
    );
};
