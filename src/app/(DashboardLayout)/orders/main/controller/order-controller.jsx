"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";

import { OrderView } from "../view/order-view.jsx";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance.js";
import { BACKEND_API } from "@/axios/constant/backend-api.js";
import responseUtil from "@/utils/responseUtil.js";
import { SORT_BY } from "@/constants/sort-constants.js";
import commonUtil from "@/utils/common-util.js";

const validationSchema = Yup.object({
  vehicleType: Yup.string().required("Item title is required"),
  phone: Yup.string().required("Phone number is required"),
  pickup_address: Yup.string().required("Pick up address is required"),
  pickup_remark: Yup.string().required("Pick up remarks is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
});

const OrderController = () => {
  const router = useRouter();

  const sourceToken = axios.CancelToken.source();

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      vehicleType: "Bike",
      phone: "0753304215",
      pickup_address: "No 78, Keels Housing Scheme, Pinwatta, Panadura.",
      pickup_remark: "None",
      latitude: 6.782852,
      longitude: 79.884139,
    },
    validationSchema,
    onSubmit: () => {
      null;
    },
  });

  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);

  const [selectedFilters, setSelectedFilters] = useState({
    paymentStatus: "",
    orderStatus: "",
    orderId: "",
    sort: SORT_BY[0].value,
  });
  const memoizedSelectedFilters = useMemo(
    () => selectedFilters,
    [selectedFilters]
  );

  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [isOpenUpdateStatus, setIsOpenUpdateStatus] = useState(false);
  const [isOpenAddDeliveryDialog, setIsOpenAddDeliveryDialog] = useState(false);
  const [isOpenPickupRequestDialog, setIsOpenPickupRequestDialog] =
    useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdateStatus, setIsLoadingUpdateStatus] = useState(false);
  const [isLoadingAddDelivery, setIsLoadingAddDelivery] = useState(false);
  const [isLoadingPickupRqst, setIsLoadingPickupRqst] = useState(false);

  const handleSelectOptions = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === "orderStatus") {
      setSelectedRows([]);
    }
  };

  const handleChangeSearch = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      orderId: e.target.value,
    }));
  };

  const deleteFilter = (filterName) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: "",
    }));
    if (filterName === "orderStatus") {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (e, id) => {
    e.stopPropagation();
    setSelectedRows((prevSelectedRows) => {
      if (e.target.checked) {
        // Add the row ID if it is not already selected
        return [...prevSelectedRows, id];
      } else {
        // Remove the row ID if it is deselected
        return prevSelectedRows.filter((rowId) => rowId !== id);
      }
    });
  };

  const handleOpenCloseUpdateDialog = () => {
    if (isOpenUpdateStatus) {
      setSelectedFilters((prev) => ({
        ...prev,
        orderStatus: "",
      }));
    }
    setIsOpenUpdateStatus(!isOpenUpdateStatus);
  };

  const handleOpenCloseAddDeliveryDialog = () => {
    setIsOpenAddDeliveryDialog(!isOpenAddDeliveryDialog);
  };

  const handleOpenClosePickUpReqestDialog = () => {
    if (isOpenPickupRequestDialog) {
      formik.resetForm();
    }
    setIsOpenPickupRequestDialog(!isOpenPickupRequestDialog);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
  };

  const handleOnClickRow = (id) => {
    router.push("orders/details?id=" + id);
  };

  const handleUpdateOrderState = async () => {
    setIsLoadingUpdateStatus(true);

    await backendAuthApi({
      url: BACKEND_API.ORDER_UPDATE_STATUS,
      method: "PUT",
      cancelToken: sourceToken.token,
      data: {
        currentStatus: selectedFilters.orderStatus,
        listOfIds: selectedRows,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          handleFetchOrders();
          handleOpenCloseUpdateDialog();
        } else {
          enqueueSnackbar(res.data.responseMessage, {
            variant: responseUtil.findResponseType(res.data.responseCode),
          });
        }
      })
      .catch(() => {
        setIsLoadingUpdateStatus(false);
      })
      .finally(() => {
        setIsLoadingUpdateStatus(false);
      });
  };

  const handleAddDeliveryOrders = async () => {
    setIsLoadingAddDelivery(true);

    await backendAuthApi({
      url: BACKEND_API.ORDER_CREATE_DELIVERY,
      method: "GET",
      cancelToken: sourceToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          handleFetchOrders();
          handleOpenCloseAddDeliveryDialog();
        } else {
          enqueueSnackbar(res.data.responseMessage, {
            variant: responseUtil.findResponseType(res.data.responseCode),
          });
        }
      })
      .catch(() => {
        setIsLoadingAddDelivery(false);
      })
      .finally(() => {
        setIsLoadingAddDelivery(false);
      });
  };

  const handlePickUpRequests = async () => {
    commonUtil.validateFormik(formik);

    if (formik.isValid) {
      setIsLoadingPickupRqst(true);

      await backendAuthApi({
        url: BACKEND_API.ORDER_PICK_UP_REQUEST,
        method: "POST",
        cancelToken: sourceToken.token,
        data: {
          ...formik.values,
          latitude: formik.values.latitude.toString(),
          longitude: formik.values.longitude.toString(),
        },
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            handleFetchOrders();
            handleOpenClosePickUpReqestDialog();
          } else {
            enqueueSnackbar(res.data.responseMessage, {
              variant: responseUtil.findResponseType(res.data.responseCode),
            });
          }
        })
        .catch(() => {
          setIsLoadingPickupRqst(false);
        })
        .finally(() => {
          setIsLoadingPickupRqst(false);
        });
    }
  };

  const handleFetchOrders = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.ORDERS,
      method: "GET",
      cancelToken: sourceToken.token,
      params: {
        page,
        limit,
        ...selectedFilters,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setData(res.data.responseData.data);
          setDocumentCount(res.data.responseData.count);
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
    handleFetchOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, memoizedSelectedFilters]);

  return (
    <OrderView
      data={data}
      selectedRows={selectedRows}
      isLoading={isLoading}
      selectedFilters={selectedFilters}
      handleSelectRow={handleSelectRow}
      handleSelectOptions={handleSelectOptions}
      handleChangeSearch={handleChangeSearch}
      deleteFilter={deleteFilter}
      handleOnClickRow={handleOnClickRow}
      formik={formik}
      isOpenUpdateStatus={isOpenUpdateStatus}
      isOpenAddDeliveryDialog={isOpenAddDeliveryDialog}
      isOpenPickupRequestDialog={isOpenPickupRequestDialog}
      isLoadingUpdateStatus={isLoadingUpdateStatus}
      isLoadingAddDelivery={isLoadingAddDelivery}
      isLoadingPickupRqst={isLoadingPickupRqst}
      handleOpenCloseUpdateDialog={handleOpenCloseUpdateDialog}
      handleOpenCloseAddDeliveryDialog={handleOpenCloseAddDeliveryDialog}
      handleOpenClosePickUpReqestDialog={handleOpenClosePickUpReqestDialog}
      handleUpdateOrderState={handleUpdateOrderState}
      handleAddDeliveryOrders={handleAddDeliveryOrders}
      handlePickUpRequests={handlePickUpRequests}
      limit={limit}
      page={page}
      documentCount={documentCount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default OrderController;
