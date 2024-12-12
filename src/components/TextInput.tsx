import { HTMLAttributes } from "react";
import { mergeClassNames } from "../util/classNames";

type PlainInputProps = Omit<HTMLAttributes<HTMLInputElement>, 'className'>;

type CustomInputProps = {
    fullWidth?: boolean;
    placeholder?: string;
};

type InputProps = PlainInputProps & CustomInputProps;

function TextInput(props: InputProps) {
    const classNames = mergeClassNames(
        "text-input",
        props.fullWidth && "text-input-full-w"
    );

    return <input 
        {...props}
        className={classNames}
    />
}

export default TextInput;