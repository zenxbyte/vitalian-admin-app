import { useEffect } from "react";
import { useSnackbar } from "notistack";
import useSnackbarStore from "../store/notification-store";

let displayed = [];

const SnackbarNotifier = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notifications = useSnackbarStore((state) => state.notifications);
  const removeSnackbar = useSnackbarStore((state) => state.removeSnackbar);

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = displayed.filter((key) => id !== key);
  };

  useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // Dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // Do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // Display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // Remove this snackbar from Zustand store
            removeSnackbar(myKey);
            removeDisplayed(myKey);
          },
        });

        // Keep track of displayed snackbars
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, removeSnackbar]);

  return null;
};

export default SnackbarNotifier;
