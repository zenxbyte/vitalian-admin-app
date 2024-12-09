"use client";

import React, { useState } from "react";
import { DashboardView } from "../view/dashboard-view.jsx";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance.js";
import { BACKEND_API } from "@/axios/constant/backend-api.js";
import responseUtil from "@/utils/responseUtil.js";
import { useEffect } from "react";

const DashboardController = () => {
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [isLoadingRecentOrds, setIsLoadingRecentOrds] = useState(false);

  const [transactions, setTransactions] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentOrdCount, setRecentOrdCount] = useState(0);

  const fetchRecentTransactions = async () => {
    await backendAuthApi({
      url: BACKEND_API.ORDER_RECENT_TRANSACTIONS,
      method: "GET",
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setTransactions(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingTransactions(false);
      })
      .finally(() => {
        setIsLoadingTransactions(false);
      });
  };

  const fetchRecentOrders = async () => {
    await backendAuthApi({
      url: BACKEND_API.ORDER_RECENT_ORDERS,
      method: "GET",
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setRecentOrders(res.data.responseData.orders);
          setRecentOrdCount(res.data.responseData.count);
        }
      })
      .catch(() => {
        setIsLoadingRecentOrds(false);
      })
      .finally(() => {
        setIsLoadingRecentOrds(false);
      });
  };

  useEffect(() => {
    fetchRecentTransactions();
    fetchRecentOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardView
      isLoadingTransactions={isLoadingTransactions}
      isLoadingRecentOrds={isLoadingRecentOrds}
      transactions={transactions}
      recentOrders={recentOrders}
      recentOrdCount={recentOrdCount}
    />
  );
};

export default DashboardController;
