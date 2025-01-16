import { useState, ChangeEvent } from "react";
import { WebcamCamera } from "./WebcamCamera.tsx";
import { ImageCropper } from "./ImageCropper.tsx";
import { Camera, FileText, Upload } from "lucide-react";
import type { CropArea } from "./types/types.tsx"

function App() {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleCapture = (ImageData: string) => {
    setCurrentImage(ImageData);
    setShowCamera(false);
  }

  const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectFile = event.target.files?.[0];

    if (!selectFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCurrentImage(e.target?.result as string);
    }
    reader.readAsDataURL(selectFile);
  }

  const handleCropComplete = async (croppedArea: CropArea) => {
    if(!currentImage) return;

    try {
      setCroppedImage(await ImageLoader(currentImage, croppedArea));
      setCurrentImage(null);
    } catch (error) {
      console.error("画像の切り取りに失敗しました");
    }

  }

  const ImageLoader = async(
    image: string,
    croppedArea: CropArea
    ) : Promise<string> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          if (!ctx) return;

          canvas.width = 2480;
          canvas.height = 3508;

          ctx.drawImage(img, croppedArea.x, croppedArea.y, croppedArea.width, croppedArea.height, 0, 0, canvas.width, canvas.height);
          
          resolve(canvas.toDataURL('image/jpeg', 1.0));
        }
        img.src = image;
      })
      
    }

  return (
    <div className="container border bg-gray-200 flex flex-col">
      <header className=" bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="mr-2"/>
            練習用アプリ
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto bg-green-200 flex-grow px-4 py-6">
        <div className="flex flex-col items-stretch gap-4">
          <button onClick={() => setShowCamera(true)} className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 ">
            <Camera className="mr-2" />
            写真をとる
          </button> 
          <label className="flex items-center px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-700 ">
            <Upload className="mr-2" />
            画像・PDFをアップロードする
            <input type="file" accept="image/*" onChange={handleFile} className="hidden"/>
          </label>        
        </div>
        { showCamera && (<WebcamCamera onCapture={handleCapture} onClose={() => setShowCamera(false) }/>) }
        { currentImage && (<ImageCropper image={currentImage} onCropComplete={handleCropComplete} onCancel={() => setCurrentImage(null)}/>) }
        { croppedImage && <img src={croppedImage} alt="" />}
      </main>
      
    </div>
  )
}

export default App;
