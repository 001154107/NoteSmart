import { StateNode, TLEventHandlers } from 'tldraw'

export class WandIdle extends StateNode {
	static override id = 'idle'

	override onPointerDown: TLEventHandlers['onPointerDown'] = (info) => {
		this.parent.transition('brushing', info)
	}
}

export class WandBrushing extends StateNode {
	static override id = 'brushing'

	override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerMove: TLEventHandlers['onPointerMove'] = () => {
		// Visual feedback could be added here (e.g. drawing a selection box)
	}

	override onPointerUp: TLEventHandlers['onPointerUp'] = async () => {
		const { inputs } = this.editor
		const { originPagePoint, currentPagePoint } = inputs
        
        const box = {
            x: Math.min(originPagePoint.x, currentPagePoint.x),
            y: Math.min(originPagePoint.y, currentPagePoint.y),
            w: Math.abs(originPagePoint.x - currentPagePoint.x),
            h: Math.abs(originPagePoint.y - currentPagePoint.y),
        }

        // Trigger the AI action
        console.log('Wand selection:', box)
        
        // Call the API
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ selection: box })
            });
            const data = await response.json();
            console.log('AI Response:', data);
            
            // Create a text shape with the result
            if (data.classification === 'math') {
                this.editor.createShape({
                    type: 'text',
                    x: box.x + box.w + 20,
                    y: box.y,
                    props: { text: data.latex_content }
                })
            }
        } catch (e) {
            console.error("AI Error", e)
        }

		this.parent.transition('idle')
	}
}

export class WandTool extends StateNode {
	static override id = 'wand'
	static override initial = 'idle'
	static override children = () => [WandIdle, WandBrushing]

    override onEnter = () => {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}
}
