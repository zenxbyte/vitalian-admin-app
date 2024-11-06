import { create } from "zustand";

const useSnackbarStore = create((set) => ({
  notifications: [],

  // Action to add a new snackbar notification
  enqueueSnackbar: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          key: notification.key || new Date().getTime(),
          ...notification,
        },
      ],
    })),

  // Action to remove a snackbar by key
  removeSnackbar: (key) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.key !== key
      ),
    })),
}));

export default useSnackbarStore;
