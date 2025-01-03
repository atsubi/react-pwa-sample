import { useState, useRef } from "react";
import {Camera, CameraType} from "react-camera-pro";

export default function WebcamPro() {
    const [cameras, setCameras] = useState(0);
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
            <Camera ref={cameraProRef}
                aspectRatio={4 / 3}
                numberOfCamerasCallback={setCameras}
                errorMessages={{
                noCameraAccessible: undefined,
                permissionDenied: undefined,
                switchCamera: undefined,
                canvas: undefined
            }} />
            {image && <img src={image} alt="Taken Photo" />}
            <button onClick={() => setImage(cameraProRef.current?.takePhoto() as string)}>Take Photo</button>
            <button hidden={cameras <= 1} onClick={() => cameraProRef.current?.switchCamera()}>Switch</button>
        </div>
    );
}