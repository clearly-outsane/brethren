import create, { StateCreator } from 'zustand';

interface CanvasSlice {
  thresholds: { [x: string]: unknown };
  addThreshold: (props: unknown) => void;
  lenis: unknown;
  setLenis: (lenis: unknown) => void;
  router: any;
  dom: any;
}
const createCanvasSlice: StateCreator<
  CanvasSlice,
  [['zustand/persist', CanvasSlice | unknown]],
  [],
  CanvasSlice
> = (set, get) => ({
  thresholds: {},
  addThreshold: ({ id, value }) => {
    const thresholds = { ...get().thresholds };
    thresholds[id] = value;
    set({ thresholds });
  },
  lenis: undefined,
  setLenis: (lenis) => set({ lenis }),
});

const useBoundStore = create<CanvasSlice>()((...a) => ({
  ...createCanvasSlice(...a),
}));

export default useBoundStore;
