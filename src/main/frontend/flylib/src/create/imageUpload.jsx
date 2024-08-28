import {useRef, useState} from 'react';
import "./imageUpload.css";
import ImageResize from "../utils/imageResize.jsx";

export default function ImageUpload() {
    // Allowed image types
    const allowedImageTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/bmp']
    // Consts for handling to dropzone and change of style on dragging
    const dropZoneRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [style, setStyle] = useState("previewCanvas");
    const dragCounter = useRef(0);

    function uploadImage(e) {
        // Check if file has been added with input button or dropped
        let files;

        if (e.dataTransfer) {
            files = e.dataTransfer.files; // drag and drop
        } else if (e.target) {
            files = e.target.files; // file input
        }

        if (files) {
            [...files].forEach((file, i) => {
                // Check if file is of accepted image format
                if (allowedImageTypes.includes(file.type)) {
                    console.log("File is an image of type: " + file.type);

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
                            console.log("height = " + canvasHeight);
                            const resizedImage = ImageResize(img, canvasWidth, canvasHeight, "previewCanvas");
                            previewCanvasRef.current.style.backgroundImage = `url(${resizedImage})`;
                        }
                    }
                    reader.readAsDataURL(file);
                } else {
                    console.log("File is not an image");
                }
            });
        } else {
            console.log("No files found");
        }
    }
    function onDropHandler(e) {
        console.log("file dropped");
        e.preventDefault();
        setStyle("previewCanvas");
        uploadImage(e);
    }

    function onDragEnterHandler(e) {
        e.preventDefault();
        dragCounter.current += 1;
        console.log("file is in dropzone");
        setStyle("previewCanvasDrag");
    }

    function onDragLeaveHandler(e) {
        e.preventDefault();
        dragCounter.current -= 1;
        console.log("file is out of dropzone");
        if (dragCounter.current === 0) {
            setStyle("previewCanvas");
        }
    }
    function onDragOverHandler(e) {
        e.preventDefault();
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
            onDragEnter={onDragEnterHandler}
            onDragLeave={onDragLeaveHandler}
        >
            <div id="canvasContainer">
                <canvas
                    id="previewCanvas"
                    className={style}
                    ref={previewCanvasRef}
                >
                </canvas>
                <input type="file" id="uploadButton" name="uploadButton" onInput={uploadImage} />
            </div>
        </div>
    )

}