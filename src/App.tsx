import { useState } from "react";
import { WebcamCamera } from "./WebcamCamera.tsx";
import { Camera, FileText, Upload } from "lucide-react";

function App() {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleCapture = (ImageData: string) => {
    setCurrentImage(ImageData);
    setShowCamera(false);
  }

  return (
    <div className="container border bg-gray-200 flex flex-col">
      <header className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="mr-2"/>
            練習用アプリ
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto bg-green-200 flex-grow px-4 py-6">
        <div className="flex flex-col items-stretch">
          <button onClick={() => setShowCamera(true)} className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 ">
            <Camera className="mr-2" />
            写真をとる
          </button> 
          <button onClick={(e) => e.preventDefault()} className="flex items-center px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-700 ">
            <Upload className="mr-2" />
            画像・PDFをアップロードする
          </button>        
        </div>
        {showCamera && (<WebcamCamera onCapture={handleCapture} onClose={() => setShowCamera(false) }/>)}
        {currentImage && (<img src={currentImage} alt="" />) }
      </main>
      
    </div>
  )
}

export default App;
