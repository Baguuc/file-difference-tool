type Lang = {
    pathsFormTitle: string;
    pathInputBeforeChosenLabel: string;
    pathInputAfterChosenLabel: string;
    folder1Label: string;
    folder2Label: string;
};

const en: Lang = {
    pathsFormTitle: "Choose the folders",
    pathInputBeforeChosenLabel: "Choose a folder",
    pathInputAfterChosenLabel: "Chosen",
    folder1Label: "Folder 1",
    folder2Label: "Folder 2"
} as const;

const pl: Lang = {
    pathsFormTitle: "Wybierz foldery",
    pathInputBeforeChosenLabel: "Wybierz folder",
    pathInputAfterChosenLabel: "Wybrano",
    folder1Label: "Folder 1",
    folder2Label: "Folder 2"
} as const;

const langs = {
    en,
    pl
} as const;

type LangID = keyof typeof langs;

function getCurrLangID(): LangID {
    return (localStorage.getItem('currLang') || "en") as LangID;
}

function getCurrLang() {
    const currLangID: LangID = getCurrLangID();

    return langs[currLangID];
}

function setCurrLang(id: LangID) {
    localStorage.setItem('currLang', id);
}

export default langs;
export {
    getCurrLang,
    getCurrLangID,
    setCurrLang
};
export type {
    LangID
};