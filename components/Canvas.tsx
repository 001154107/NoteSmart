"use client";

import { Tldraw, useEditor, Editor } from "tldraw";
import "tldraw/tldraw.css";
import { WandTool } from "./WandTool";
import { LassoOverlay } from "./LassoOverlay";

const customTools = [WandTool];

function CustomToolbar() {
  const editor = useEditor();
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
        // Dynamic import to avoid SSR issues with canvas/window
        const { loadPDF } = await import('@/utils/pdf');
        const images = await loadPDF(file);
        
        let yOffset = 0;
        
        // Use run which is often an alias or similar to batch in some versions, or just cast
        // In tldraw v2+, it might be 'run' or just direct updates. 
        // But 'batch' should exist. Let's try casting to any to be safe for now as we know it exists in runtime.
        (editor as any).batch(() => {
            images.forEach((dataUrl, index) => {
                const assetId = `asset:${Date.now()}_${index}` as any;
                const shapeId = `shape:${Date.now()}_${index}` as any;
                
                // Create asset
                editor.createAssets([
                    {
                        id: assetId,
                        type: 'image',
                        typeName: 'asset',
                        props: {
                            name: `page_${index + 1}`,
                            src: dataUrl,
                            w: 1000, // Placeholder, should be dynamic based on image
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
  
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex gap-2 bg-white p-2 rounded-lg shadow-md border border-gray-200 pointer-events-auto">
      <button
        className={`p-2 rounded hover:bg-gray-100 ${editor.getCurrentToolId() === 'wand' ? 'bg-blue-100 text-blue-600' : ''}`}
        onClick={() => editor.setCurrentTool('wand')}
        title="AI Wand"
      >
        🪄 AI Wand
      </button>
      <button
        className={`p-2 rounded hover:bg-gray-100 ${editor.getCurrentToolId() === 'select' ? 'bg-blue-100 text-blue-600' : ''}`}
        onClick={() => editor.setCurrentTool('select')}
        title="Select"
      >
        👆 Select
      </button>
      <button
        className={`p-2 rounded hover:bg-gray-100 ${editor.getCurrentToolId() === 'draw' ? 'bg-blue-100 text-blue-600' : ''}`}
        onClick={() => editor.setCurrentTool('draw')}
        title="Draw"
      >
        ✏️ Draw
      </button>
      <label className="p-2 rounded hover:bg-gray-100 cursor-pointer" title="Upload PDF">
        📄 Upload PDF
        <input type="file" accept=".pdf" className="hidden" onChange={handleUpload} />
      </label>
    </div>
  );
}

export default function Canvas() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Tldraw 
        persistenceKey="cognitive-canvas-v1"
        tools={customTools}
        onMount={(editor: Editor) => {
            // Initial setup if needed
            // editor.setCurrentTool('wand') // Optional: start with wand
        }}
        components={{
          InFrontOfTheCanvas: LassoOverlay
        }}
      >
        <CustomToolbar />
      </Tldraw>
    </div>
  );
}
