(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/WandTool.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WandBrushing",
    ()=>WandBrushing,
    "WandIdle",
    ()=>WandIdle,
    "WandTool",
    ()=>WandTool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tldraw/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript)");
;
class WandIdle extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = 'idle';
    onPointerDown = (info)=>{
        this.parent.transition('brushing', info);
    };
}
class WandBrushing extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = 'brushing';
    onEnter = ()=>{
        this.editor.setCursor({
            type: 'cross',
            rotation: 0
        });
    };
    onPointerMove = ()=>{
    // Visual feedback could be added here (e.g. drawing a selection box)
    };
    onPointerUp = async ()=>{
        const { inputs } = this.editor;
        const { originPagePoint, currentPagePoint } = inputs;
        const box = {
            x: Math.min(originPagePoint.x, currentPagePoint.x),
            y: Math.min(originPagePoint.y, currentPagePoint.y),
            w: Math.abs(originPagePoint.x - currentPagePoint.x),
            h: Math.abs(originPagePoint.y - currentPagePoint.y)
        };
        // Trigger the AI action
        console.log('Wand selection:', box);
        // Call the API
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selection: box
                })
            });
            const data = await response.json();
            console.log('AI Response:', data);
            // Create a text shape with the result
            if (data.classification === 'math') {
                this.editor.createShape({
                    type: 'text',
                    x: box.x + box.w + 20,
                    y: box.y,
                    props: {
                        text: data.latex_content
                    }
                });
            }
        } catch (e) {
            console.error("AI Error", e);
        }
        this.parent.transition('idle');
    };
}
class WandTool extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StateNode"] {
    static id = 'wand';
    static initial = 'idle';
    static children = ()=>[
            WandIdle,
            WandBrushing
        ];
    onEnter = ()=>{
        this.editor.setCursor({
            type: 'cross',
            rotation: 0
        });
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Canvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Canvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/tldraw/dist-esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$Tldraw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tldraw/dist-esm/lib/Tldraw.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tldraw/editor/dist-esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WandTool$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/WandTool.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const customTools = [
    __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$WandTool$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WandTool"]
];
function CustomToolbar() {
    _s();
    const editor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"])();
    const handleUpload = async (e)=>{
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            // Dynamic import to avoid SSR issues with canvas/window
            const { loadPDF } = await __turbopack_context__.A("[project]/utils/pdf.ts [app-client] (ecmascript, async loader)");
            const images = await loadPDF(file);
            let yOffset = 0;
            // Use run which is often an alias or similar to batch in some versions, or just cast
            // In tldraw v2+, it might be 'run' or just direct updates. 
            // But 'batch' should exist. Let's try casting to any to be safe for now as we know it exists in runtime.
            editor.batch(()=>{
                images.forEach((dataUrl, index)=>{
                    const assetId = `asset:${Date.now()}_${index}`;
                    const shapeId = `shape:${Date.now()}_${index}`;
                    // Create asset
                    editor.createAssets([
                        {
                            id: assetId,
                            type: 'image',
                            typeName: 'asset',
                            props: {
                                name: `page_${index + 1}`,
                                src: dataUrl,
                                w: 1000,
                                h: 1400,
                                mimeType: 'image/png',
                                isAnimated: false
                            },
                            meta: {}
                        }
                    ]);
                    // Create shape
                    editor.createShape({
                        id: shapeId,
                        type: 'image',
                        x: 0,
                        y: yOffset,
                        props: {
                            assetId: assetId,
                            w: 1000,
                            h: 1400
                        }
                    });
                    yOffset += 1420; // Add some gap
                });
            });
        } catch (error) {
            console.error("Failed to load PDF", error);
            alert("Failed to load PDF");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex gap-2 bg-white p-2 rounded-lg shadow-md border border-gray-200 pointer-events-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `p-2 rounded hover:bg-gray-100 ${editor.getCurrentToolId() === 'wand' ? 'bg-blue-100 text-blue-600' : ''}`,
                onClick: ()=>editor.setCurrentTool('wand'),
                title: "AI Wand",
                children: "🪄 AI Wand"
            }, void 0, false, {
                fileName: "[project]/components/Canvas.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `p-2 rounded hover:bg-gray-100 ${editor.getCurrentToolId() === 'select' ? 'bg-blue-100 text-blue-600' : ''}`,
                onClick: ()=>editor.setCurrentTool('select'),
                title: "Select",
                children: "👆 Select"
            }, void 0, false, {
                fileName: "[project]/components/Canvas.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `p-2 rounded hover:bg-gray-100 ${editor.getCurrentToolId() === 'draw' ? 'bg-blue-100 text-blue-600' : ''}`,
                onClick: ()=>editor.setCurrentTool('draw'),
                title: "Draw",
                children: "✏️ Draw"
            }, void 0, false, {
                fileName: "[project]/components/Canvas.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "p-2 rounded hover:bg-gray-100 cursor-pointer",
                title: "Upload PDF",
                children: [
                    "📄 Upload PDF",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        accept: ".pdf",
                        className: "hidden",
                        onChange: handleUpload
                    }, void 0, false, {
                        fileName: "[project]/components/Canvas.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Canvas.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Canvas.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(CustomToolbar, "t0rsU/t1p+LiVrRpHUSgNnV9Lz4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tldraw$2f$editor$2f$dist$2d$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEditor"]
    ];
});
_c = CustomToolbar;
function Canvas() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 w-screen h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tldraw$2f$dist$2d$esm$2f$lib$2f$Tldraw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tldraw"], {
            persistenceKey: "cognitive-canvas-v1",
            tools: customTools,
            onMount: (editor)=>{
            // Initial setup if needed
            // editor.setCurrentTool('wand') // Optional: start with wand
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CustomToolbar, {}, void 0, false, {
                fileName: "[project]/components/Canvas.tsx",
                lineNumber: 114,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/Canvas.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/Canvas.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, this);
}
_c1 = Canvas;
var _c, _c1;
__turbopack_context__.k.register(_c, "CustomToolbar");
__turbopack_context__.k.register(_c1, "Canvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_917d4cb0._.js.map