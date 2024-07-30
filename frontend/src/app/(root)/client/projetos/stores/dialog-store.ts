import { create } from "zustand";

type DialogCreateProjetoStore = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

export const useDialogManagerStore = create<DialogCreateProjetoStore>((set) => ({
  isOpen: false,
  openDialog: () => {
    set({ isOpen: true });
  },
  closeDialog: () => {
    set({ isOpen: false });
  },
}));
