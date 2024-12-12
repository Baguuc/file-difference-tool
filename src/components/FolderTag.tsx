import { getFolder1Label, getFolder2Label } from "../consts/folderLabel";

type FolderTagVariant = "1" | "2";

type FolderTagProps = {
    variant: FolderTagVariant
};

function FolderTag(props: FolderTagProps) {
    return <p className={`folder-tag folder-tag-${props.variant}`}>{props.variant === "1" ? getFolder1Label() : getFolder2Label()}</p>
}

export default FolderTag;
