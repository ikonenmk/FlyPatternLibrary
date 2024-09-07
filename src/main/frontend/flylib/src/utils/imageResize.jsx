export default function ImageResize(image, width, height, canvasId) {
    // get a canvas element and context
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext("2d");

    // resize canvas
    const ratio = width / image.width;
    canvas.width = width;
    canvas.height = image.height * ratio;

    // draw image
    ctx.clearRect(0,0, width, height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL();

}