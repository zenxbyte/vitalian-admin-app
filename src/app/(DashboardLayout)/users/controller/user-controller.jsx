"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { UserView } from "../view/user-view.jsx";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance.js";
import { BACKEND_API } from "@/axios/constant/backend-api.js";
import responseUtil from "@/utils/responseUtil.js";
import commonUtil from "@/utils/common-util.js";

const validationSchema = Yup.object().shape({
  userFirstName: Yup.string().required("First name is required"),
  userLastName: Yup.string().required("Last name is required"),
  userEmail: Yup.string().email().required("Email required"),
  userPassword: Yup.string()
    .required("Password required")
    .min(4, "Minimum 4 characters required"),
});

const UserController = () => {
  const sourceToken = axios.CancelToken.source();

  const formik = useFormik({
    initialValues: {
      userFirstName: "",
      userLastName: "",
      userEmail: "",
      userPassword: "",
    },
    validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleOpenCloseAdd = () => {
    if (isOpenAdd) {
      formik.resetForm();
    }

    setIsOpenAdd(!isOpenAdd);
  };

  const handleOpenCloseConfirmation = (id) => {
    setSelectedRow(isOpenConfirmation ? null : id);
    setIsOpenConfirmation(!isOpenConfirmation);
  };

  const handleCreate = async () => {
    commonUtil.validateFormik(formik);

    if (formik.isValid && formik.dirty) {
      setIsLoadingAdd(true);

      await backendAuthApi({
        url: BACKEND_API.ADMIN_CREATE,
        method: "POST",
        cancelToken: sourceToken.token,
        data: formik.values,
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            handleOpenCloseAdd();
            handleFetchAdmins();
          }
        })
        .catch(() => {
          setIsLoadingAdd(false);
        })
        .finally(() => {
          setIsLoadingAdd(false);
        });
    }
  };

  const handleDelete = async () => {
    setIsLoadingDelete(true);

    await backendAuthApi({
      url: BACKEND_API.ADMIN_DELETE + selectedRow,
      method: "DELETE",
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          handleOpenCloseConfirmation();
          handleFetchAdmins();
        }
      })
      .catch(() => {
        setIsLoadingDelete(false);
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  };

  const handleFetchAdmins = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.ADMIN_ALL,
      method: "GET",
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setData(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleFetchAdmins();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserView
      data={data}
      selectedRow={selectedRow}
      isOpenConfirmation={isOpenConfirmation}
      handleOpenCloseConfirmation={handleOpenCloseConfirmation}
      isLoading={isLoading}
      isLoadingDelete={isLoadingDelete}
      handleDelete={handleDelete}
      formik={formik}
      isOpenAdd={isOpenAdd}
      isLoadingAdd={isLoadingAdd}
      handleOpenCloseAdd={handleOpenCloseAdd}
      handleCreate={handleCreate}
    />
  );
};

export default UserController;
