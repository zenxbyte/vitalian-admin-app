"use client";

import { useSearchParams } from "next/navigation";
import { OrderDetailsView } from "../view/order-details-view.jsx";
import { useState } from "react";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance.js";
import { BACKEND_API } from "@/axios/constant/backend-api.js";
import axios from "axios";
import responseUtil from "@/utils/responseUtil.js";

const OrderDetailsController = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const sourceToken = axios.CancelToken.source();

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
    <OrderDetailsView data={data} isLoading={isLoading} isError={isError} />
  );
};

export default OrderDetailsController;
