import { useEffect } from "react";
import { useSnackbar } from "notistack";
import useSnackbarStore from "@/store/notification-store";

let displayed = [];

const SnackbarNotifier = () => {
  const notifications = useSnackbarStore((state) => state.notifications);
  const removeSnackbar = useSnackbarStore((state) => state.removeSnackbar);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // remove this snackbar from Zustand store
            removeSnackbar(myKey);
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, removeSnackbar]);

  return null;
};

export default SnackbarNotifier;
