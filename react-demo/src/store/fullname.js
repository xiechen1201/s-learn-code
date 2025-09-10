import { create } from "zustand";

const usePersonStore = create((set, _, store) => ({
  age: 0,
  firstName: "",
  lastName: "",
  addAge: () => set((state) => ({ age: state.age + 1 })),
  updateFirstName: (firstName) => set({ firstName }),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
  reset: () => {
    set(store.getInitialState());
  }
}));

export { usePersonStore };
