import { useEffect, useState } from "react";
import { getCurrLang } from "../consts/lang";
import PathInput from "./PathInput";
import { setFolder1Label, setFolder2Label } from "../consts/folderLabel";
import { FileListData } from "./FileList";
import { invoke } from "@tauri-apps/api/core";
import Button from "./Button";
import TextInput from "./TextInput";

type FolderFile = {
    name: string;
};
type FolderFiles = FolderFile[];

type PathsFormProps = {
    setFileListData(data: FileListData): void;
};

function PathsForm(props: PathsFormProps) {
    const [folder1Files, setFolder1Files] = useState([] as FolderFiles);
    const [folder2Files, setFolder2Files] = useState([] as FolderFiles);

    function scan() {
        invoke("scan_paths", {
            path1: folder1Files,
            path2: folder2Files
        })
        .then((response) => {
            props.setFileListData(response as FileListData);
        });
    }

    return <div className="paths-form">
        <h1 className="paths-form-title">{getCurrLang().pathsFormTitle}</h1>
        <div className="paths-form-section">
            <PathInput
                id={"p1"}
                onInput={setFolder1Files}
                dark
                outline
                fullWidth
            />
            <TextInput 
                onInput={(ev) => {
                    setFolder1Label(ev.currentTarget.value);
                }}
                placeholder={getCurrLang().folderLabelInputPlaceholder}
                fullWidth
            />
        </div>
        <div className="paths-form-section">
            <PathInput
                id={"p2"}
                onInput={setFolder2Files}
                dark
                outline
                fullWidth
            />
            <TextInput
                onInput={(ev) => {
                    setFolder2Label(ev.currentTarget.value);
                }}
                placeholder={getCurrLang().folderLabelInputPlaceholder}
                fullWidth
            />
        </div>
        <Button 
            onClick={scan}
            fullWidth
        >
            {getCurrLang().scanButtonLabel}
        </Button>
    </div>
}

export default PathsForm;
export type { FolderFiles as PathFiles };