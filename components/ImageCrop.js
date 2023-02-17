import React, { useEffect, useRef, useState } from "react";
import ReactCrop from "react-image-crop";

const ImageCrop = ({ onCropComplete }) => {
    const [src, setSrc] = useState(null);
    const [crop, setCrop] = useState({ aspect: 16 / 9 });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => setSrc(reader.result);
        reader.readAsDataURL(file);
    };

    const handleCropComplete = (crop, pixelCrop) => {
        onCropComplete(crop, pixelCrop);
    };

    return (
        <>
            {src ? (
                <ReactCrop
                    src={src}
                    crop={crop}
                    onChange={(newCrop) => setCrop(newCrop)}
                    onComplete={handleCropComplete}
                />
            ) : (
                <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
            )}
        </>
    );
}

export default ImageCrop;