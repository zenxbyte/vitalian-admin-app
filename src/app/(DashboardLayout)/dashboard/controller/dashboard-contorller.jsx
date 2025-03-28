"use client";

import React, { useState } from "react";
import { DashboardView } from "../view/dashboard-view.jsx";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance.js";
import { BACKEND_API } from "@/axios/constant/backend-api.js";
import responseUtil from "@/utils/responseUtil.js";
import { useEffect } from "react";
import {
  ORDER_STATUS_DELIVERY_CREATED,
  ORDER_STATUS_PACKED,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_WAITING,
} from "@/constants/order-status.js";

const DashboardController = () => {
  const [transactions, setTransactions] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentPickups, setRecentPickups] = useState([]);

  const [recentOrdCount, setRecentOrdCount] = useState(0);

  const [countPending, setCountPending] = useState(0);
  const [countPacked, setCountPacked] = useState(0);
  const [countReady, setCountReady] = useState(0);
  const [countWaiting, setCountWaiting] = useState(0);

  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [isLoadingRecentOrds, setIsLoadingRecentOrds] = useState(true);
  const [isLoadingRecentPickups, setIsLoadingRecentPickups] = useState(true);
  const [isLoadingCountPending, setIsLoadingCountPending] = useState(true);
  const [isLoadingCountPacked, setIsLoadingCountPacked] = useState(true);
  const [isLoadingCountReady, setIsLoadingCountReady] = useState(true);
  const [isLoadingCountWaiting, setIsLoadingCountWaiting] = useState(true);

  const fetchCountPending = async () => {
    setIsLoadingCountPending(true);

    await backendAuthApi({
      url: BACKEND_API.ORDER_STAT_COUNT,
      method: "GET",
      params: {
        orderStatus: ORDER_STATUS_PENDING,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCountPending(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingCountPending(false);
      })
      .finally(() => {
        setIsLoadingCountPending(false);
      });
  };

  const fetchCountPacked = async () => {
    setIsLoadingCountPacked(true);

    await backendAuthApi({
      url: BACKEND_API.ORDER_STAT_COUNT,
      method: "GET",
      params: {
        orderStatus: ORDER_STATUS_PACKED,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCountPacked(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingCountPacked(false);
      })
      .finally(() => {
        setIsLoadingCountPacked(false);
      });
  };

  const fetchCountReady = async () => {
    setIsLoadingCountReady(true);

    await backendAuthApi({
      url: BACKEND_API.ORDER_STAT_COUNT,
      method: "GET",
      params: {
        orderStatus: ORDER_STATUS_DELIVERY_CREATED,
      },
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCountReady(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingCountReady(false);
      })
      .finally(() => {
        setIsLoadingCountReady(false);
      });
  };

  const fetchCountWaiting = async () => {
    // setIsLoadingCountWaiting(true);

    // await backendAuthApi({
    //   url: BACKEND_API.ORDER_STAT_COUNT,
    //   method: "GET",
    //   params: {
    //     orderStatus: ORDER_STATUS_WAITING,
    //   },
    // })
    //   .then((res) => {
    //     if (responseUtil.isResponseSuccess(res.data.responseCode)) {
    //       setCountWaiting(res.data.responseData);
    //     }
    //   })
    //   .catch(() => {
    //     setIsLoadingCountWaiting(false);
    //   })
    //   .finally(() => {
    //     setIsLoadingCountWaiting(false);
    //   });
  };

  const fetchRecentPickUpRequests = async () => {
    await backendAuthApi({
      url: BACKEND_API.ORDER_RECENT_PICK_RQSTS,
      method: "GET",
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setRecentPickups(res.data.responseData);
        }
      })
      .catch(() => {
        setIsLoadingRecentPickups(false);
      })
      .finally(() => {
        setIsLoadingRecentPickups(false);
      });
  };

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
    fetchCountPending();
    fetchCountPacked();
    fetchCountReady();
    //fetchCountWaiting();
    fetchRecentTransactions();
    fetchRecentPickUpRequests();
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
      recentPickups={recentPickups}
      countPending={countPending}
      countPacked={countPacked}
      countReady={countReady}
      countWaiting={countWaiting}
      isLoadingRecentPickups={isLoadingRecentPickups}
      isLoadingCountPending={isLoadingCountPending}
      isLoadingCountPacked={isLoadingCountPacked}
      isLoadingCountReady={isLoadingCountReady}
      isLoadingCountWaiting={isLoadingCountWaiting}
    />
  );
};

export default DashboardController;
