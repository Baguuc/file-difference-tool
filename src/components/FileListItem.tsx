import FolderTag from "./FolderTag";

const tagsMap = {
    1: <FolderTag variant={1} />,
    2: <FolderTag variant={2} />,
    "both": [
        <FolderTag variant={1} />,
        <FolderTag variant={2} />
    ]
} as const;

type TagVariant = keyof typeof tagsMap;

type FileListItemProps = {
    filename: string,
    tag: TagVariant,
    outline?: boolean,
    dark?: boolean
};

function FileListItem(props: FileListItemProps) {
    return <div className={`file-list-item${props.dark ? " file-list-item-dark" : ""}${props.outline ? " file-list-item-outline" : ""}`}>
        <h1 className="file-list-item-title">{props.filename}</h1>
        <div className="file-list-item-tags">{tagsMap[props.tag]}</div>
    </div>
}

export default FileListItem;