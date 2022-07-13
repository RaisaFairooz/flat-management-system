import create from "zustand";

interface Modal {
  open: boolean;
  setOpen: any;
}

export const useModalStore = create<Modal>((set, get) => ({
  open: false,
  setOpen: () =>
    set((state) => ({
      open: !get().open,
    })),
}));
