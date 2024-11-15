import { create } from "zustand";

const useSnackbarStore = create((set) => ({
  notifications: [],

  enqueueSnackbar: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          key: new Date().getTime(), // Generate a unique key if none is provided
          ...notification,
        },
      ],
    })),

  closeSnackbar: (key, dismissAll = false) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        dismissAll || notification.key === key
          ? { ...notification, dismissed: true }
          : notification
      ),
    })),

  removeSnackbar: (key) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.key !== key
      ),
    })),
}));

export default useSnackbarStore;
