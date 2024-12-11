import { useEffect, useState } from "react";
import { getCurrLang } from "../consts/lang";

type _File = {
    name: string;
};
type PathFiles = _File[];

type PathInputProps = {
    id: string;
    onInput(files: PathFiles): void;
    dark?: boolean;
    outline?: boolean;
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

    return <div className={`path-input${props.dark ? " path-input-dark" : ""}${props.outline ? " path-input-outline" : ""}${chosen ? " path-input-chosen" : ""}`}>
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
                console.log(ev.eventPhase);
                setFiles(asList);
            }}
        />
    </div>
}

type PathsFormProps = {
    onInput?(data: { path1: PathFiles, path2: PathFiles }): void;
};

function PathsForm(props: PathsFormProps) {
    const [path1, setPath1] = useState(null as PathFiles | null);
    const [path2, setPath2] = useState(null as PathFiles | null);

    useEffect(() => {
        console.log(path1, path2);

        if(props.onInput && path1 && path2) {
            props.onInput({ path1, path2 });
        }
    }, [path1, path2]);

    return <div className="paths-form">
        <h1 className="paths-form-title">{getCurrLang().pathsFormTitle}</h1>
        <PathInput
            id={"p1"}
            onInput={setPath1}
            dark={true} 
            outline={true}
        />
        <PathInput
            id={"p2"}
            onInput={setPath2} 
            dark={true} 
            outline={true}
        />
    </div>
}

export default PathsForm;
export type { PathFiles };