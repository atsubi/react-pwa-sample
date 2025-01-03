/**
 * React Webcamを使った撮影クラス
 */
import { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";

export default function WebcamCamera() {

    const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
    const [camera, setCamera] = useState<MediaDeviceInfo>();

    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>("");

  // 背面カメラを設定
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameraDevices = devices.filter(({ kind }) => kind === "videoinput");
      setCameras(cameraDevices);
      if (cameras?.length) {
        setCamera(cameras[1]);
      }
    });
  });

  const capture = useCallback(() => {
    if (webcamRef.current != null) {
      const imageSrc = webcamRef.current?.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: {exact: "environment"}
          // deviceId: camera?.deviceId,
        }}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>シャッター</button>
      {imgSrc && <img src={imgSrc} />}
      <ul>
        {cameras?.map((camera) => {
            return ( 
                <li>{camera?.kind} {camera?.label}</li> 
            );
        })}
      </ul>
    </>
  );
}
