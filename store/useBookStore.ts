import { create } from "zustand";

interface State {
  date: string;
  time: string;
  disabled: boolean;
  addDate: (date: string) => void;
  addTime: (time: string) => void;
  setDisabled: (disabled: boolean) => void;
}

export const useBookStore = create<State>((set) => ({
  date: "",
  time: "",
  disabled: false,
  addDate: (date) => set(() => ({ date })),
  addTime: (time) =>
    set(() => ({ time: time ? `${+time < 10 ? "0" : ""}${time}:00` : "" })),
  setDisabled: (disabled) => set({ disabled }),
}));
