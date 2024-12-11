import { getCurrLang } from "../consts/lang";

type FolderTagVariant = "1" | "2";

type FolderTagProps = {
    variant: FolderTagVariant
};

function FolderTag(props: FolderTagProps) {
    return <p className={`folder-tag folder-tag-${props.variant}`}>{props.variant === "1" ? getCurrLang().folder1Label : getCurrLang().folder2Label}</p>
}

export default FolderTag;