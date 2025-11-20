import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
// In a real app, we should bundle the worker or point to a CDN
// For this prototype, we'll try to use the CDN approach to avoid build complexity
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export async function loadPDF(file: File): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdf = await loadingTask.promise;
  
  const images: string[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // High quality
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) continue;
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({
      canvasContext: context,
      viewport: viewport,
      canvasFactory: {
          create: (width: number, height: number) => {
              const canvas = document.createElement('canvas');
              canvas.width = width;
              canvas.height = height;
              return canvas;
          },
          reset: (canvasAndContext: { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D }, width: number, height: number) => {
              canvasAndContext.canvas.width = width;
              canvasAndContext.canvas.height = height;
          },
          destroy: (canvasAndContext: { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D }) => {
              canvasAndContext.canvas.width = 0;
              canvasAndContext.canvas.height = 0;
          }
      }
    } as any).promise;
    
    images.push(canvas.toDataURL('image/png'));
  }
  
  return images;
}
