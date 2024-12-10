import "./App.css";
import FileListItem from "./components/FileListItem";
import FolderTag from "./components/FolderTag";

function App() {
  return <div>
    <FileListItem tag={"both"} filename="Filename" dark={false} outline={false} />
  </div>
}

export default App;
