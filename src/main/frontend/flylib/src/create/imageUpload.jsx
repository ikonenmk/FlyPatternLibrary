import {useRef} from 'react';
import "./imageUpload.css";
import ImageResize from "../utils/imageResize.jsx";

export default function ImageUpload() {
    //Allowed image types
    const allowedImageTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/bmp']
    // reference to dropzone element
    const dropZoneRef = useRef(null);
    const previewCanvasRef = useRef(null);
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
                        console.log("items is an image of type: " + item.type);

                        // Change preview image to chosen image
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            // create imageElement object
                           const img = new Image();
                           img.src = e.target.result;
                           // resize image
                            img.onload = () => {
                                const canvasWidth = dropZoneRef.current.offsetWidth;
                                console.log("width = " + canvasWidth);
                                const canvasHeight = dropZoneRef.current.offsetHeight;
                                console.log("height = " +canvasHeight);
                                const resizedImage = ImageResize(img, canvasWidth, canvasHeight, "previewCanvas");
                                previewCanvasRef.current.style.backgroundImage = `url(${resizedImage})`;
                            }
                        }
                        reader.readAsDataURL(file);
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

    function onDragLeaveHandler(e) {
        e.preventDefault();
        console.log("file is out of dropzone");
    }

    function onUploadClick(e) {
        console.log("click click");
    }

    return(
        <div
            id="drop-zone"
            ref={dropZoneRef}
            onDrop={onDropHandler}
            onDragOver={onDragOverHandler}
            onDragLeave={onDragLeaveHandler}
        >
            <canvas
                id="previewCanvas"
                ref={previewCanvasRef}
            >
            </canvas>
        </div>
    )

}