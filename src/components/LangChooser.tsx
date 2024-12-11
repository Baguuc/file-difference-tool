import langs, { LangID, getCurrLangID, setCurrLang } from "../consts/lang";

function LangChooser() {
    const langIDList = Object.keys(langs);

    return <select
        onInput={(ev) => {
            setCurrLang(ev.currentTarget.value as LangID);
            location.reload();
        }}
        className="lang-chooser"
    >
        <option value="" selected disabled hidden>{getCurrLangID().toUpperCase()}</option>
        {langIDList.map(lang => <option value={lang}>{lang.toUpperCase()}</option>)}
    </select>
}

export default LangChooser;
