import {useState, useRef} from 'react';
import DefaultImage from "./defaultimage.png";
export default function ImageUpload() {
    const [preview, setPreview] = useState(DefaultImage);

    //Allowed image types
    const allowedImageTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/bmp']
    function onDropHandler(e) {
        console.log("file dropped");

        e.preventDefault();

        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
                // Check if dragged item is a file
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    // Check if file is of accepted image format
                    if (allowedImageTypes.includes(item.type)){
                        console.log("items is an image of type: " +item.type);
                    } else {
                        console.log("item is not an image");
                    }
                }
            });
        } else {
            console.log("ignoring selected item, not a file");
        }
    }

    function onDragOverHandler(e) {
        e.preventDefault();
        console.log("file is in dropzone");
    }

    return(
        <div
            id="drop-zone"
            onDrop={onDropHandler}
            onDragOver={onDragOverHandler}
            >
            <img
                src={preview}
                alt="Preview image"
                />
        </div>
    )

}