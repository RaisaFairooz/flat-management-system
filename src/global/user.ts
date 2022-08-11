import create from "zustand";
import { persist } from "zustand/middleware";

interface Data {
  role: string;
  phone_number: string;
  id: string;
}
interface User {
  user: Data;
}
export const useUserStore = create(
  persist(
    (set, get) => ({
      user: {
        role: "",
        phone_number: "",
        id: "",
      },
      setData: (dt: Data) =>
        set((state) => ({
          user: { role: dt.role, phone_number: dt.phone_number, id: dt.id },
        })),
    }),
    {
      name: "user", // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);
