import {
	pointInPolygon,
	polygonsIntersect,
	StateNode,
	TLPointerEventInfo,
	TLShape,
	VecModel,
	Box,
} from 'tldraw'
import { lassoPointsAtom } from './wandAtoms'

export class WandTool extends StateNode {
	static override id = 'wand'
	static override children() {
		return [WandIdle, WandLassoing]
	}
	static override initial = 'idle'
}

export class WandIdle extends StateNode {
	static override id = 'idle'

	override onPointerDown(info: TLPointerEventInfo) {
		const { editor } = this

		editor.selectNone()
		this.parent.transition('lassoing', info)
	}
}

export class WandLassoing extends StateNode {
	static override id = 'lassoing'

	info = {} as TLPointerEventInfo

	markId = null as null | string

	override onEnter(info: TLPointerEventInfo) {
		lassoPointsAtom.set([])
		this.markId = null
		this.info = info

		this.startLasso()
	}

	private startLasso() {
		this.markId = this.editor.markHistoryStoppingPoint('lasso start')
	}

	override onPointerMove(): void {
		this.addPointToLasso()
	}

	private addPointToLasso() {
		const { inputs } = this.editor

		const { x, y, z } = inputs.currentPagePoint.toFixed()
		const newPoint = { x, y, z }

		lassoPointsAtom.set([...lassoPointsAtom.get(), newPoint])
	}

	private getShapesInLasso() {
		const { editor } = this

		const shapes = editor.getCurrentPageRenderingShapesSorted()
		const lassoPoints = lassoPointsAtom.get()
		const shapesInLasso = shapes.filter((shape) => {
			return this.doesLassoFullyContainShape(lassoPoints, shape)
		})

		return shapesInLasso
	}

	private doesLassoFullyContainShape(lassoPoints: VecModel[], shape: TLShape): boolean {
		const { editor } = this

		const geometry = editor.getShapeGeometry(shape)
		const pageTransform = editor.getShapePageTransform(shape)
		const shapeVertices = pageTransform.applyToPoints(geometry.vertices)

		const allVerticesInside = shapeVertices.every((vertex) => {
			return pointInPolygon(vertex, lassoPoints)
		})

		// Early return if any vertex is not inside the lasso
		if (!allVerticesInside) {
			return false
		}

		// If any shape edges intersect with the lasso, then we know it can't be fully contained by the lasso
		if (geometry.isClosed) {
			if (polygonsIntersect(shapeVertices, lassoPoints)) {
				return false
			}
		}

		return true
	}

	override onPointerUp(): void {
		this.complete()
	}

	override onComplete() {
		this.complete()
	}

	async complete() {
		const { editor } = this

		const shapesInLasso = this.getShapesInLasso()
        
        // Calculate bounding box of the lasso for the AI context
        const lassoPoints = lassoPointsAtom.get()
        if (lassoPoints.length > 0) {
            const xs = lassoPoints.map(p => p.x)
            const ys = lassoPoints.map(p => p.y)
            const minX = Math.min(...xs)
            const maxX = Math.max(...xs)
            const minY = Math.min(...ys)
            const maxY = Math.max(...ys)

            const selection = {
                x: minX,
                y: minY,
                w: maxX - minX,
                h: maxY - minY
            }

            // Capture the canvas region as PNG
            let imageDataUrl = null;
            try {
                // Use the editor's toImageDataUrl method to export the current page as PNG
                imageDataUrl = await editor.toImageDataUrl(
                    [...editor.getCurrentPageShapeIds()],
                    {
                        format: 'png',
                        background: true,
                        padding: 10,
                        scale: 1
                    }
                );
            } catch (error) {
                console.error('Failed to capture canvas:', error);
            }

            // Dispatch event for ChatSidebar
            const event = new CustomEvent('wand-selection', {
                detail: {
                    selection,
                    image: imageDataUrl
                }
            });
            window.dispatchEvent(event);
        }

        // Clear the lasso points
        lassoPointsAtom.set([]);

        // Select the shapes as well, so the user sees what was captured
		editor.setSelectedShapes(shapesInLasso)

		editor.setCurrentTool('select')
	}
}
