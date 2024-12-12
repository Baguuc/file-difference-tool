import { getCurrLang } from "./lang";

const obj = {
    folder1Label: null as string | null,
    folder2Label: null as string | null,
};

function getFolder1Label() {
    return obj.folder1Label || getCurrLang().folder1DefaultLabel;
}

function getFolder2Label() {
    return obj.folder2Label || getCurrLang().folder2DefaultLabel;
}

function setFolder1Label(newValue: string) {
    obj.folder1Label = newValue;
}

function setFolder2Label(newValue: string) {
    obj.folder2Label = newValue;
}

export {
    getFolder1Label,
    getFolder2Label,
    setFolder1Label,
    setFolder2Label
}