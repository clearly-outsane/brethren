import create, { StateCreator } from 'zustand';

interface ScrollSlice {
  thresholds: { [x: string]: unknown };
  addThreshold: (props: unknown) => void;
  lenis: unknown;
  setLenis: (lenis: unknown) => void;
}
const createScrollSlice: StateCreator<
  ScrollSlice,
  [['zustand/persist', ScrollSlice | unknown]],
  [],
  ScrollSlice
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

const useBoundStore = create<ScrollSlice>()((...a) => ({
  ...createScrollSlice(...a),
}));

export default useBoundStore;
