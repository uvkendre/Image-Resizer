// Select DOM elements
const uploadBox = document.querySelector(".upload-box"),
    previewImg = uploadBox.querySelector("img"),
    fileInput = uploadBox.querySelector("input"),
    widthInput = document.querySelector(".width input"),
    heightInput = document.querySelector(".height input"),
    ratioInput = document.querySelector(".ratio input"),
    qualityInput = document.querySelector(".quality input"),
    downloadBtn = document.querySelector(".download-btn");

let ogImageRatio; // Original image aspect ratio

// Function to handle file upload
const loadFile = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (!file) return; // Exit if no file is selected

    // Display the selected image in the preview
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        // Set initial width and height inputs to the image's original dimensions
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        // Calculate and store the original aspect ratio
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        // Show the editing options
        document.querySelector(".wrapper").classList.add("active");
    });
};

// Update height input based on width input and aspect ratio checkbox
widthInput.addEventListener("keyup", () => {
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

// Update width input based on height input and aspect ratio checkbox
heightInput.addEventListener("keyup", () => {
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
});

// Function to resize the image and initiate download
const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // Set image quality based on the quality checkbox (0.5 for 50%, 1.0 for 100%)
    const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    // Set canvas size based on the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // Draw the selected image onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    
    // Set the download link and file name
    a.href = canvas.toDataURL("image/jpeg", imgQuality);
    a.download = `image_${new Date().getTime()}.jpg`;
    a.click(); // Trigger download
};

// Event listeners
downloadBtn.addEventListener("click", resizeAndDownload);
fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
