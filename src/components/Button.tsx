import { HTMLAttributes } from "react";
import { mergeClassNames } from "../util/classNames";

type PlainButtonProps = React.PropsWithChildren<
    Omit<
        HTMLAttributes<HTMLButtonElement>, 
        'className'
    >
>;
type CustomButtonProps = {
    fullWidth?: boolean;
};

type ButtonProps = PlainButtonProps & CustomButtonProps;

function Button(props: ButtonProps) {
    const classNames = mergeClassNames(
        "btn",
        props.fullWidth && "btn-full-w"
    );
    
    return <button 
        {...props}
        className={classNames}
    >
        {props.children}
    </button>
}

export default Button;