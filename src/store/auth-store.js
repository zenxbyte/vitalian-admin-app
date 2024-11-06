import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define auth and snackbar state with Zustand and add persistence
const useAuthStore = create(
  persist(
    (set) => ({
      // Auth State
      auth: {
        isLoggedIn: false,
        user: {
          id: "",
          token: "",
          name: "",
          userName: "",
          userRole: "",
          userNewPwd: true,
        },
      },
      loginUser: (payload) =>
        set((state) => ({
          auth: {
            isLoggedIn: true,
            user: {
              id: payload._id,
              token: payload.empToken,
              name: `${payload.empFirstName} ${payload.empLastName}`,
              userName: payload.empUserName,
              userRole: payload.empRole,
              userNewPwd: payload.empNewPwd,
            },
          },
        })),
      logoutUser: () =>
        set(() => ({
          auth: {
            isLoggedIn: false,
            user: {
              id: "",
              token: "",
              name: "",
              userName: "",
              userRole: "",
              userNewPwd: true,
            },
          },
        })),
    }),
    {
      name: "auth-storage", // storage name for localStorage
    }
  )
);

export default useAuthStore;
