import {useState, useRef} from 'react';
import DefaultImage from "./defaultimage.png";
export default function ImageUpload() {
    const [preview, setPreview] = useState(DefaultImage);

    return(
        <div>
            <img
                src={preview}
                alt="Preview image"
                />
        </div>
    )

}