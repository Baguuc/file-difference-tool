type FolderTagVariant = "1" | "2";

type FolderTagProps = {
    variant: FolderTagVariant
};

function FolderTag(props: FolderTagProps) {
    return <p className={`folder-tag folder-tag-${props.variant}`}>{props.variant === "1" ? "Folder 1" : "Folder 2"}</p>
}

export default FolderTag;