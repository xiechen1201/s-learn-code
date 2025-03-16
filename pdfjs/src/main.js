import * as pdfjs from "pdfjs-dist";
// 初始化 worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
    "../node_modules/pdfjs-dist/build/pdf.worker.mjs";

const dropZone = document.querySelector(".drop-zone");

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

["dragenter", "dragover"].forEach((eventName) => {
    dropZone.addEventListener(eventName, highlight, false);
});

["dragleave", "drop"].forEach((eventName) => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropZone.classList.add("dragover");
}

function unhighlight() {
    dropZone.classList.remove("dragover");
}

dropZone.addEventListener("drop", handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;

    handleFiles(files);
}

async function handleFiles(files) {
    const url = URL.createObjectURL(files[0]);
    const pdf = await pdfjs.getDocument(url).promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    renderTextLayer(textContent);
}

function renderTextLayer(textContent) {
    console.log(textContent)
    const preview = document.querySelector(".preview");

    textContent.items.forEach((item) => {
        console.log(item)
        const span = document.createElement("span");
        span.textContent = item.str;
        span.style.position = "absolute";
        span.style.left = `${item.transform[4]}px`;
        span.style.top = `${item.transform[5]}px`;
        preview.appendChild(span);
        console.log(preview.innerHTML)
    });

    // document.body.appendChild(preview);
}
