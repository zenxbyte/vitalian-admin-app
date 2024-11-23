"use client";

import axios from "axios";
import { OrderView } from "../view/orderView.jsx";
import { useEffect, useMemo, useState } from "react";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance.js";
import { BACKEND_API } from "@/axios/constant/backend-api.js";
import responseUtil from "@/utils/responseUtil.js";
import { SORT_BY } from "@/constants/sort-constants.js";

const OrderController = () => {
  const sourceToken = axios.CancelToken.source();

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

  const [isLoading, setIsLoading] = useState(true);

  const handleSelectOptions = (e) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
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
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10));
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
      isLoading={isLoading}
      selectedFilters={selectedFilters}
      handleSelectOptions={handleSelectOptions}
      handleChangeSearch={handleChangeSearch}
      deleteFilter={deleteFilter}
      limit={limit}
      page={page}
      documentCount={documentCount}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default OrderController;
