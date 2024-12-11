import FileListItem from "./FileListItem";

type FileListItemData = {
    filename: string;
    folder: "1" | "2" | "both";
};
type FileListData = FileListItemData[];

type FileListProps = {
    data: FileListData
};

function renderItem(item: FileListItemData, idx: number): React.ReactNode | React.ReactNode[] {
    const keyFirstPart = item.folder === '1'
        ? 'p1:' 
        : item.folder === '2' 
            ? 'p2:' 
            : 'bo:';
    const keySecondPart = idx;
    const key = `${keyFirstPart}${keySecondPart}`;

    return <FileListItem 
        key={key}
        filename={item.filename} 
        tag={item.folder} 
        dark={true} 
        outline={true} 
    />
}

function FileList(props: FileListProps): React.ReactNode {
    const mapped = props.data.map(renderItem);

    return <div className="file-list">{mapped}</div>
}

export default FileList;
export type { FileListData };