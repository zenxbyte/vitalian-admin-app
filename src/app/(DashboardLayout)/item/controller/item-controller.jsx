"use client";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { ItemView } from "../view/item-view";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance";
import { BACKEND_API } from "@/axios/constant/backend-api";
import responseUtil from "@/utils/responseUtil";
import commonUtil from "@/utils/common-util";

const validationSchemaItem = Yup.object({
  itemTitle: Yup.string().required("Item title is required"),
  itemDescription: Yup.string(),
  itemIsActive: Yup.boolean().required(),
  itemPrice: Yup.number()
    .required("Item price is required")
    .min(0, "Price cannot be negative"),
  itemDiscount: Yup.number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be greater than 100"),
  itemColor: Yup.string().required("Item color is required"),

  // Validate itemSizeVariants as individual fields for each size
  itemSizes: Yup.array().of(
    Yup.object().shape({
      size: Yup.string().required("Size is required"),
      quantity: Yup.number().required("Quantity is required"),
    })
  ),
  itemInformation: Yup.object().shape({
    material: Yup.string().max(100, "Material cannot exceed 100 characters"),

    color: Yup.string(),

    fitType: Yup.string().max(50, "Fit type cannot exceed 50 characters"),

    stretch: Yup.string().max(
      50,
      "Stretch description cannot exceed 50 characters"
    ),

    style: Yup.string().max(
      50,
      "Style description cannot exceed 50 characters"
    ),

    accessories: Yup.string().max(
      100,
      "Accessories description cannot exceed 100 characters"
    ),

    modelSize: Yup.string().max(
      20,
      "Model size description cannot exceed 20 characters"
    ),

    washAndCare: Yup.string().max(
      500,
      "Instructions cannot exceed 500 characters"
    ),
  }),
});

const ItemController = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const cancelToken = axios.CancelToken.source();

  const [data, setData] = useState(null);

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([null]);

  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const formik = useFormik({
    initialValues: {
      itemTitle: "",
      itemDescription: "",
      itemIsActive: "",
      itemPrice: 0,
      itemDiscount: 0,
      itemColor: "Red",
      itemImages: [],
      itemSizes: [],
      itemInformation: {
        material: "",
        color: "",
        fitType: "",
        stretch: "",
        style: "",
        accessories: "",
        modelSize: "",
        washAndCare: "",
      },
    },
    validationSchema: validationSchemaItem,
    onSubmit: () => {
      null;
    },
  });

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleOpenCloseItemUpdateDialog = () => {
    if (isOpenUpdateDialog) {
      setImages(() => [
        ...data.itemImages.map((img) => ({
          file: null,
          fileUrl: img.imgUrl,
          status: "old",
        })),
      ]);
    }
    setIsOpenUpdateDialog(!isOpenUpdateDialog);
  };

  const handleUpdateItem = async () => {
    commonUtil.validateFormik(formik);
    if (formik.isValid && formik.dirty) {
      setIsLoadingUpdate(true);

      const existingImages = formik.values.itemImages.filter((image) =>
        images.some((updatedImage) => updatedImage.fileUrl === image.imgUrl)
      );

      const formdata = new FormData();
      images.map((item) => {
        if (item.status === "new") {
          formdata.append("file", item.file);
        }
      });
      const body = JSON.stringify({
        ...formik.values,
        itemImages: existingImages,
      });

      formdata.append("data", body);

      await backendAuthApi({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: BACKEND_API.ITEM_UPDATE + data._id,
        method: "PUT",
        cancelToken: cancelToken.token,
        data: formdata,
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            handleOpenCloseItemUpdateDialog();
            fetchDetails();
          }
        })
        .catch(() => {
          setIsLoadingUpdate(false);
        })
        .finally(() => {
          setIsLoadingUpdate(false);
        });
    }
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
          setImages(() => [
            ...res.data.responseData.itemImages.map((img) => ({
              file: null,
              fileUrl: img.imgUrl,
              status: "old",
            })),
          ]);

          const resData = res.data.responseData;

          formik.setValues({
            itemTitle: resData.itemTitle,
            itemDescription: resData.itemDescription,
            itemIsActive: resData.itemIsActive,
            itemColor: resData.itemColor,
            itemPrice: resData.itemPrice,
            itemDiscount: resData.itemDiscount,
            itemSizes: resData.itemSizes.map((item) => ({
              size: item.size,
              quantity: item.quantity,
            })),
            itemImages: resData.itemImages.map((item) => ({
              imgUrl: item.imgUrl,
              imgKey: item.imgKey,
            })),
            itemInformation: resData.itemInformation,
          });
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
      formik={formik}
      isLoading={isLoading}
      data={data}
      images={images}
      setImages={setImages}
      selectedImage={selectedImage}
      handleImageClick={handleImageClick}
      isOpenUpdateDialog={isOpenUpdateDialog}
      handleOpenCloseItemUpdateDialog={handleOpenCloseItemUpdateDialog}
      handleUpdateItem={handleUpdateItem}
      isLoadingUpdate={isLoadingUpdate}
    />
  );
};

export default ItemController;
