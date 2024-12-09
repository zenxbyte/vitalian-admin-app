import axios from "axios";
import { v1 as uuid } from "uuid";

import { SNACKBAR_MESSAGE } from "@/constants/snackbar-constants";
import commonUtil from "@/utils/common-util";
import responseUtil from "@/utils/responseUtil";
import useSnackbarStore from "@/store/notification-store";
import useAuthStore from "@/store/auth-store";
import { useRouter } from "next/navigation";

export const backendAuthApi = axios.create({
  // one minute timeout
  timeout: 60000,
});

backendAuthApi.interceptors.request.use((request) => {
  const { auth } = useAuthStore.getState();

  const bearerToken = auth ? auth.user.token : null;
  if (bearerToken) {
    request.headers.Authorization = `Bearer ${bearerToken}`;
  }
  return request;
});

backendAuthApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const router = useRouter();
    const { logoutUser } = useAuthStore.getState();
    const { enqueueSnackbar } = useSnackbarStore.getState();

    if (error && !axios.isCancel(error)) {
      let errorMessage = SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.MESSAGE;
      let errorCode = null;

      if (error.response) {
        const errorResponse = error.response.data;
        if (!commonUtil.isUndefinedOrNull(errorResponse.responseMessage)) {
          errorMessage = errorResponse.responseMessage;
          errorCode = errorResponse.responseCode;
        }

        // Logout user if the response code matches specific auth errors
        if (
          ["AUTH-002", "AUTH-003", "AUTH-004"].includes(
            errorResponse.responseCode
          )
        ) {
          logoutUser();
          router.push("/login");
          enqueueSnackbar({
            message: errorMessage,
            options: {
              key: uuid(),
              variant: errorCode
                ? responseUtil.findResponseType(errorCode)
                : SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.VARIANT,
            },
          });
          return;
        }
      }
      enqueueSnackbar({
        message: errorMessage,
        options: {
          key: uuid(),
          variant: errorCode
            ? responseUtil.findResponseType(errorCode)
            : SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.VARIANT,
        },
      });
    }
    return Promise.reject(error);
  }
);
