/**
 * React Webcamを使った撮影クラス
 */
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { isMobile } from "react-device-detect";

export default function WebcamCamera() {

    //const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
    //const [camera, setCamera] = useState<MediaDeviceInfo>();

    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>("");

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
    }
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        videoConstraints={
            (isMobile) ? { facingMode: {exact: "environment"}, aspectRatio: 0.66666666} : {facingMode: "user", aspectRatio: 1.33333333}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>シャッター</button>
      {imgSrc && <img src={imgSrc} />}
    </>
  );
}
