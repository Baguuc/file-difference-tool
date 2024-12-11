import FileListGroup from "./FileListGroup";
import FileListItem from "./FileListItem";

type FileListItemData = {
    filename: string;
    folder: "1" | "2" | "both";
};
type FileListGroupData = FileListItemData[];
type FileListData = FileListGroupData[];

type FileListProps = {
    data: FileListData
};

function renderGroup(data: FileListGroupData): React.ReactNode | React.ReactNode[] {
    if(data.length === 1) {
        const item = data[0];

        return <FileListItem filename={item.filename} tag={item.folder} dark={true} outline={true} />
    }
    
    return <FileListGroup title="Same content" outline={true}>
        {data.map(item => <FileListItem filename={item.filename} tag={item.folder} />)}
    </FileListGroup>
}

function FileList(props: FileListProps): React.ReactNode {
    const mapped = props.data.map(renderGroup);

    return <div className="file-list">{mapped}</div>
}

export default FileList;
export type { FileListData };