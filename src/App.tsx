import "./App.css";
import FileListGroup from "./components/FileListGroup";
import FileListItem from "./components/FileListItem";

function App() {
  return <div>
    <FileListGroup title="Same content">
      <FileListItem filename="Filename 1" tag={1} dark={false} />
      <FileListItem filename="Filename 2" tag={2} dark={false} />
    </FileListGroup>
  </div>
}

export default App;
