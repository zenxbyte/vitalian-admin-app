import axios from "axios";
import { v1 as uuid } from "uuid";

import commonUtil from "@/utils/common-util";
import { SNACKBAR_MESSAGE } from "@/constants/snackbar-constants";
import responseUtil from "@/utils/responseUtil";
import useSnackbarStore from "@/store/notification-store";
import useAuthStore from "@/store/auth-store";

const { enqueueSnackbar } = useSnackbarStore.getState();

const { logoutUser, auth } = useAuthStore.getState();

export const backendAuthApi = axios.create({
  // one minute timeout
  timeout: 60000,
});

backendAuthApi.interceptors.request.use((request) => {
  const bearerToken = auth.user.token;
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
    if (error && !axios.isCancel(error)) {
      let errorMessage = SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.MESSAGE;
      let errorCode = null;

      if (error.response) {
        const errorResponse = error.response.data;
        if (!commonUtil.isUndefinedOrNull(errorResponse.responseMessage)) {
          errorMessage = errorResponse.responseMessage;
          errorCode = errorResponse.responseCode;
        }
        /**
         * Logout user if the response code matches the below mentioned
         * AUTH-002 is returned if user's token is expired
         * AUTH-003 is returned if user's token is invalid
         * AUTH-004 is returned if user is disabled
         */

        if (errorResponse.responseCode === "AUTH-004") {
          logoutUser();

          enqueueSnackbar({
            message: errorMessage,
            severity: errorCode
              ? responseUtil.findResponseType(errorCode)
              : SNACKBAR_MESSAGE.SOMETHING_WENT_WRONG.VARIANT,
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
