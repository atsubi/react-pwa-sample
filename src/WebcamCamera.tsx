/**
 * React Webcamを使った撮影クラス
 */
import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, X } from "lucide-react";
import { isMobile } from "react-device-detect";

interface CameraProps {
  onCapture: (ImageData: string) => void;
  onClose: () => void;
}

export const WebcamCamera: React.FC<CameraProps> = ({onCapture, onClose}) => {

    //const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
    //const [camera, setCamera] = useState<MediaDeviceInfo>();

    const webcamRef = useRef<Webcam>(null);

  // 背面カメラを設定
  /*useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameraDevices = devices.filter(({ kind }) => kind === "videoinput");
      setCameras(cameraDevices);
      if (cameras?.length) {
    //    setCamera(cameras[1]);
      }
    });
  });*/

  const capture = useCallback(() => {
    if (webcamRef.current != null) {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        onCapture(imageSrc);
      }      
    }
  }, [onCapture]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <button onClick={onClose} className="absolute top-4 right-4 text-white p-2">
        <X size={24}/>
      </button>
      <Webcam
        audio={false}
        videoConstraints={(isMobile) ? { facingMode: { exact: "environment" } } : { facingMode: "user" }}
        ref={webcamRef}
        screenshotFormat="image/jpeg" 
        className="w-full h-full object-cover"/>
      <Camera onClick={capture} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4"  size={32}/>
    </div>
  );
}
