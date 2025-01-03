import { useState, useRef } from "react";
import {Camera, CameraType} from "react-camera-pro";

export default function WebcamPro() {
    //const [cameras, setCameras] = useState<MediaDeviceInfo[]>();
    //const [camera, setCamera] = useState<MediaDeviceInfo>();

    const cameraProRef = useRef<CameraType>(null);
    const [image, setImage] = useState<string | undefined>();

    // 背面カメラを設定
    /*useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
        const cameraDevices = devices.filter(({ kind }) => kind === "videoinput");
        setCameras(cameraDevices);
        if (cameras?.length) {
            setCamera(cameras[1]);
        }
        });
    });*/

    return (
        <div>
            <Camera ref={cameraProRef} errorMessages={{
                noCameraAccessible: undefined,
                permissionDenied: undefined,
                switchCamera: undefined,
                canvas: undefined
            }} />
            <button onClick={() => setImage(cameraProRef.current?.takePhoto() as string)}>Take Photo</button>
            {image && <img src={image} alt="Taken Photo" />}
        </div>
    );
}