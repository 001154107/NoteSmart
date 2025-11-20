import { atom, VecModel } from 'tldraw'

// Shared atom for lasso points that can be accessed by both WandTool and LassoOverlay
export const lassoPointsAtom = atom<VecModel[]>('wand-lasso-points', [])
