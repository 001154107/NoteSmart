module.exports = [
"[project]/utils/pdf.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadPDF",
    ()=>loadPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/pdfjs-dist/build/pdf.mjs [app-ssr] (ecmascript)");
;
// Configure worker
// In a real app, we should bundle the worker or point to a CDN
// For this prototype, we'll try to use the CDN approach to avoid build complexity
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GlobalWorkerOptions"].workerSrc = `//unpkg.com/pdfjs-dist@${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"]}/build/pdf.worker.min.mjs`;
async function loadPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$pdfjs$2d$dist$2f$build$2f$pdf$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getDocument"]({
        data: arrayBuffer
    });
    const pdf = await loadingTask.promise;
    const images = [];
    for(let i = 1; i <= pdf.numPages; i++){
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({
            scale: 2.0
        }); // High quality
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) continue;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await page.render({
            canvasContext: context,
            viewport: viewport,
            canvasFactory: {
                create: (width, height)=>{
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    return canvas;
                },
                reset: (canvasAndContext, width, height)=>{
                    canvasAndContext.canvas.width = width;
                    canvasAndContext.canvas.height = height;
                },
                destroy: (canvasAndContext)=>{
                    canvasAndContext.canvas.width = 0;
                    canvasAndContext.canvas.height = 0;
                }
            }
        }).promise;
        images.push(canvas.toDataURL('image/png'));
    }
    return images;
}
}),
];

//# sourceMappingURL=utils_pdf_ts_57ec9203._.js.map