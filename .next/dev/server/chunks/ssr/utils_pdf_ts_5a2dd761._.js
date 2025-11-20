module.exports = [
"[project]/utils/pdf.ts [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/node_modules_pdfjs-dist_build_pdf_mjs_74288fa9._.js",
  "server/chunks/ssr/utils_pdf_ts_57ec9203._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/utils/pdf.ts [app-ssr] (ecmascript)");
    });
});
}),
];