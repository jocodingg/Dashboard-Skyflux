import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DownloadData from "./pages/DownloadData";

function App() {
  return <div>
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/download" Component={DownloadData} />
    </Routes>
  </div>
}

export default App
