"use client";

import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useSearchParams } from "next/navigation";

import { OrderDetailsView } from "../view/order-details-view.jsx";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance.js";
import { BACKEND_API } from "@/axios/constant/backend-api.js";
import responseUtil from "@/utils/responseUtil.js";
import { PAYMENT_STATUS } from "@/constants/payment-status.js";
import commonUtil from "@/utils/common-util.js";

const validationSchema = Yup.object({
  newStatus: Yup.mixed()
    .oneOf(PAYMENT_STATUS, "Invalid Payment Status") // Ensures only valid options are allowed
    .required("Payment Status is required"),
});

const OrderDetailsController = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const sourceToken = axios.CancelToken.source();

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [isOpenUpdatePayment, setIsOpenUpdatePayment] = useState(false);
  const [isOpenCancelOrder, setIsOpenCancelOrder] = useState(false);

  const [isLoadingUpdatePayment, setIsLoadingUpdatePayment] = useState(false);
  const [isLoadingCancelOrder, setIsLoadingCancelOrder] = useState(false);

  const formik = useFormik({
    initialValues: {
      newStatus: "",
    },
    validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const handleOpenCloseUpdatePayment = () => {
    if (!isOpenUpdatePayment) {
      formik.setFieldValue("newStatus", data.paymentDetails.paymentStatus);
    }
    setIsOpenUpdatePayment(!isOpenUpdatePayment);
  };

  const handleOpenCloseCancelOrder = () => {
    setIsOpenCancelOrder(!isOpenCancelOrder);
  };

  const handleUpdatePaymentStatus = async () => {
    commonUtil.validateFormik(formik);

    if (formik.isValid && formik.dirty) {
      setIsLoadingUpdatePayment(true);

      await backendAuthApi({
        url: BACKEND_API.ORDER_UPDATE_PAYMENT_STATUS,
        method: "POST",
        cancelToken: sourceToken.token,
        data: {
          id: data._id,
          newStatus: formik.values.newStatus,
        },
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            handleOpenCloseUpdatePayment();
            fetchDetails();
          }
        })
        .catch(() => {
          setIsLoadingUpdatePayment(false);
        })
        .finally(() => {
          setIsLoadingUpdatePayment(false);
        });
    }
  };

  const handleCancelOrder = async () => {
    setIsLoadingCancelOrder(true);

    await backendAuthApi({
      url: BACKEND_API.ORDER_CANCEL + data._id,
      method: "POST",
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          handleOpenCloseCancelOrder();
          fetchDetails();
        }
      })
      .catch(() => {
        setIsLoadingCancelOrder(false);
      })
      .finally(() => {
        setIsLoadingCancelOrder(false);
      });
  };

  const fetchDetails = async () => {
    await backendAuthApi({
      url: BACKEND_API.ORDER + id,
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
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  };

  useState(() => {
    fetchDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderDetailsView
      data={data}
      isLoading={isLoading}
      isError={isError}
      formik={formik}
      isOpenUpdatePayment={isOpenUpdatePayment}
      isOpenCancelOrder={isOpenCancelOrder}
      isLoadingUpdatePayment={isLoadingUpdatePayment}
      isLoadingCancelOrder={isLoadingCancelOrder}
      handleOpenCloseUpdatePayment={handleOpenCloseUpdatePayment}
      handleOpenCloseCancelOrder={handleOpenCloseCancelOrder}
      handleUpdatePaymentStatus={handleUpdatePaymentStatus}
      handleCancelOrder={handleCancelOrder}
    />
  );
};

export default OrderDetailsController;
