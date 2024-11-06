"use client";

import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { COOKIES } from "@/constants/cookie_constants";
import { NAVIGATION_ROUTES } from "@/navigation/navigationRoutes";
import { LoginView } from "../view/login-view";
import commonUtil from "@/utils/common-util";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance";
import { BACKEND_API } from "@/axios/constant/backend-api";

const validationSchema = Yup.object().shape({
  empUserName: Yup.string().required("User Name is required"),
  empPassword: Yup.string().required("Password is required"),
});

const LoginController = () => {
  const router = useRouter();

  let cancelToken = axios.CancelToken.source();

  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      userPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleLogin = () => {
    console.log("clicked");

    Cookies.set(COOKIES.IS_LOGGEDIN, true);
    router.push(NAVIGATION_ROUTES.dashboard.base);
    // commonUtil.validateFormik(formik);
    // if (formik.isValid && formik.dirty) {
    //   setIsLoading(true);

    //   await backendAuthApi({
    //     url: BACKEND_API.LOGIN,
    //     method: "POST",
    //     cancelToken: cancelToken.token,
    //     data: formik.values,
    //   })
    //     .then((res) => {
    //       if (responseUtil.isResponseSuccess(res.data.responseCode)) {
    //         Cookies.set(COOKIES.IS_LOGGEDIN, true);
    //         router.push(NAVIGATION_ROUTES.dashboard.base);
    //       }
    //     })
    //     .catch(() => {
    //       setIsLoading(false);
    //     })
    //     .then(() => {
    //       setIsLoading(false);
    //     });
    //}
  };
  return (
    <LoginView
      formik={formik}
      isLoading={isLoading}
      handleLogin={handleLogin}
    />
  );
};

export default LoginController;
