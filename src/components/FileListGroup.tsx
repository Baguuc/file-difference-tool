import { PropsWithChildren } from "react";

type FileListGroupProps = {
    title: string;
    outline?: boolean;
};

function FileListGroup(props: PropsWithChildren<FileListGroupProps>) {
    return <div className={`file-list-group${props.outline ? " file-list-group-outline" : ""}`}>
        <h1 className="file-list-group-title">{props.title}</h1>
        <div className="file-list-group-items">{props.children}</div>
    </div>
}

export default FileListGroup;