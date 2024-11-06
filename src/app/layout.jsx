"use client";
import { baselightTheme } from "@/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createRef } from "react";
import { SnackbarProvider } from "notistack";
import SnackbarNotifier from "@/common/snackbar-notifier";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function RootLayout({ children }) {
  // Dismiss Action to all snackbars
  const notistackRef = createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <SnackbarProvider
            dense
            preventDuplicate
            ref={notistackRef}
            action={(key) => (
              <IconButton
                aria-label="dismiss"
                size="small"
                onClick={onClickDismiss(key)}
              >
                <CloseIcon fontSize="inherit" color={"action"} />
              </IconButton>
            )}
          >
            <SnackbarNotifier />
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
