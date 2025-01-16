import React, { useState  } from 'react';
import Cropper from 'react-easy-crop';
import { RotateCcw, Check } from 'lucide-react';
import type { CropArea } from "./types/types.tsx";

interface ImageCropperProps {
    image: string;
    onCropComplete: (croppedArea: CropArea) => void;
    onCancel: () => void;
}



export const ImageCropper : React.FC<ImageCropperProps> = ({
    image,
    onCropComplete,
    onCancel    
    }) => {

    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [currentCropArea, setCurrentCropArea] = useState<CropArea | null>(null);

    const handleCropComplete = (_: any, croppedAreaPixels: CropArea) => {
        setCurrentCropArea(croppedAreaPixels);
    }

    const handleSave = () => {
        if (!currentCropArea) return;
        onCropComplete(currentCropArea);
    }

    return (
        <div className='fixed inset-0 bg-black z-50 flex flex-col'>


            <div className='relative h-full'>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={3/4}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={handleCropComplete}
                />
            </div>

            <div className='absolute bottom-4 left-0 right-0 flex justify-center space-x-4'>
                <button 
                    onClick={onCancel}
                    className='bg-red-500 rounded-full hover:bg-red-600'>
                    <RotateCcw className='text-white' size={24}/>
                </button>
                <button 
                    onClick={handleSave}
                    className='bg-green-500 rounded-full hover:bg-green-600'>
                    <Check className='text-white' size={24}/>
                </button>
            </div>
            
        </div>
    );
}