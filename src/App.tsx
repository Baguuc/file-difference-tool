import { useState } from "react";
import "./App.css";
import FileList, { FileListData } from "./components/FileList";
import PathsForm, { PathFiles } from "./components/PathsForm";
import LangChooser from "./components/LangChooser";

function App() {
  const [data, setData] = useState([] as FileListData);

  return <div className="document-root">
    <LangChooser />
    <PathsForm setFileListData={setData} />
    <FileList data={data} />
  </div>
}

export default App;
