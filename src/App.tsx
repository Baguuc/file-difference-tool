import "./App.css";
import FileList, { FileListData } from "./components/FileList";

function App() {
  const data: FileListData = [
    [{
      filename: "Filename 1",
      folder: "1"
    }],
    [{
      filename: "Filename 2",
      folder: "both"
    }],
    [{
      filename: "Filename 3",
      folder: "2"
    }],
    [
      {
        filename: "Filename 4",
        folder: "both"
      },
      {
        filename: "Filename 5",
        folder: "1"
      },
      {
        filename: "Filename 6",
        folder: "2"
      }
    ]
  ];
  return <div>
    <FileList data={data} />
  </div>
}

export default App;
