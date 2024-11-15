"use client";

import React, { useEffect, useState } from "react";
import { ItemView } from "../view/item-view";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance";
import { BACKEND_API } from "@/axios/constant/backend-api";
import responseUtil from "@/utils/responseUtil";

const ItemController = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const cancelToken = axios.CancelToken.source();

  const [data, setData] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const fetchDetails = async () => {
    setIsLoading(true);

    await backendAuthApi({
      url: BACKEND_API.ITEM_DETAILS + id,
      method: "GET",
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setData(res.data.responseData);
          handleImageClick(res.data.responseData.itemImages[0]);
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
    fetchDetails();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ItemView
      isLoading={isLoading}
      data={data}
      selectedImage={selectedImage}
      handleImageClick={handleImageClick}
    />
  );
};

export default ItemController;
