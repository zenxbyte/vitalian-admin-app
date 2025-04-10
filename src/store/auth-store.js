import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { COOKIES } from "@/constants/cookie_constants";

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
          userEmail: "",
          userRole: "",
        },
      },
      loginUser: (payload) =>
        set((state) => ({
          auth: {
            isLoggedIn: true,
            user: {
              id: payload.user._id,
              token: payload.token,
              name: `${payload.user.userFirstName} ${payload.user.userLastName}`,
              userEmail: payload.user.userEmail,
              userRole: payload.user.userRole,
            },
          },
        })),
      logoutUser: () => {
        Cookies.remove(COOKIES.IS_LOGGEDIN)
        set(() => ({
          auth: {
            isLoggedIn: false,
            user: {
              id: "",
              token: "",
              name: "",
              userEmail: "",
              userRole: "",
            },
          },
        }))
      }
      
    }),
    {
      name: "auth-storage", // storage name for localStorage
    }
  )
);

export default useAuthStore;
