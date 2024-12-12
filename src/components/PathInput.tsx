import { useState, useEffect } from "react";
import { getCurrLang } from "../consts/lang";
import { PathFiles } from "./PathsForm";
import { mergeClassNames } from "../util/classNames";

type PathInputProps = {
    id: string;
    onInput(files: PathFiles): void;
    dark?: boolean;
    outline?: boolean;
    fullWidth?: boolean;
};

function PathInput(props: PathInputProps) {
    const [files, setFiles] = useState(null as PathFiles | null);
    const [chosen, setChosen] = useState(!!files);
    const [label, setLabel] = useState(getCurrLang().pathInputBeforeChosenLabel);

    useEffect(() => {
        const el = document.getElementById(props.id);
        el?.setAttribute("webkitdirectory", "1");
        el?.setAttribute("mozdirectory", "1");
        el?.setAttribute("directory", "1");
    }, []);

    useEffect(() => {
        if(chosen) {
            setLabel(`${getCurrLang().pathInputAfterChosenLabel} (${files?.length})`);
        }
    }, [chosen]);

    useEffect(() => {
        setChosen(!!files);

        if(props.onInput && files) {
            props.onInput(files);
        }
    }, [files]);

    const classNames = mergeClassNames(
        "path-input",
        props.dark && "path-input-dark",
        props.outline && "path-input-outline",
        props.fullWidth && "path-input-full-w",
        chosen && "path-input-chosen",
    );
    
    return <div className={classNames}>
        <p className="path-input-label">{label}</p>
        <input 
            className="path-input-input"
            id={props.id} 
            type="file" 
            onChange={(ev) => {
                const asList = [...ev.currentTarget.files!].map(item => {
                    return {
                        name: item.name
                    };
                });
                setFiles(asList);
            }}
        />
    </div>
}

export default PathInput;