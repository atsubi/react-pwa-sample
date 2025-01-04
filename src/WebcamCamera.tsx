/**
 * React Webcamを使った撮影クラス
 */
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import { isMobile } from "react-device-detect";

export default function WebcamCamera() {

    //const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
    //const [camera, setCamera] = useState<MediaDeviceInfo>();

    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>("");

    const [showCamera, setShowCamera] = useState<boolean>(true);

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
        setImgSrc(imageSrc);
      }
      setShowCamera(false);
    }
  }, [webcamRef]);

  return (
    <>
        <main className="max-w-7xl">
            {showCamera && (
                <><Webcam
                    audio={false}
                    videoConstraints={(isMobile) ? { facingMode: { exact: "environment" } } : { facingMode: "user" }}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg" />
                <Camera onClick={capture} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4">シャッター</Camera>
                </> 
            ) }
            {imgSrc && <img src={imgSrc} />}
        </main>
    </>
  );
}
