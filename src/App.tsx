import { useEffect, useState } from "react";
import "./App.css";
import FileList, { FileListData } from "./components/FileList";
import { invoke } from "@tauri-apps/api/core";
import PathsForm, { PathFiles } from "./components/PathsForm";
import LangChooser from "./components/LangChooser";

function App() {
  const [data, setData] = useState([] as FileListData);
  const [path1Files, setPath1File] = useState([] as PathFiles);
  const [path2Files, setPath2File] = useState([] as PathFiles);

  useEffect(() => {
    invoke("scan_paths", {
      path1: path1Files,
      path2: path2Files
    })
    .then((response) => {
      setData(response as FileListData);
    });
  }, [path1Files, path2Files]);

  return <div className="document-root">
    <LangChooser />
    <PathsForm onInput={({ path1, path2 }) => {
      setPath1File(path1);
      setPath2File(path2);
    }} />
    <FileList data={data} />
  </div>
}

export default App;
