import WebcamCamera from "./WebcamCamera.tsx";
import { FileText } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="text-3xl font-bold text-gray-900 flex items-center">
          <FileText />
          <h1>練習用アプリ</h1>
        </div>
      </header>
      <WebcamCamera />
    </div>
  )
}

export default App;
