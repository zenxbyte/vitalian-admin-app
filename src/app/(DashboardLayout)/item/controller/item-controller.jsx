"use client";

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { ItemView } from "../view/item-view.jsx";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance";
import { BACKEND_API } from "@/axios/constant/backend-api";
import responseUtil from "@/utils/responseUtil";
import commonUtil from "@/utils/common-util";
import { useSnackbar } from "notistack";
import { SNACKBAR_VARIANT } from "@/constants/snackbar-constants.js";

const validationSchemaItem = Yup.object({
  itemTitle: Yup.string().required("Item title is required"),
  itemDescription: Yup.string(),
  itemIsActive: Yup.boolean().required(),
  itemBasePrice: Yup.number()
    .required("Item base price is required")
    .min(0, "Base cannot be negative"),
  itemPrice: Yup.number()
    .required("Item price is required")
    .min(0, "Price cannot be negative"),
  itemDiscount: Yup.number()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be greater than 100"),
  itemVariants: Yup.array().of(
    Yup.object().shape({
      variantColor: Yup.string().required("Image color is required"),
      variantSizes: Yup.array().of(
        Yup.object().shape({
          size: Yup.string().required("Size is required"),
          quantity: Yup.number().required("Quantity is required"),
        })
      ),
      variantImages: Yup.array(),
    })
  ),
  itemInformation: Yup.object().shape({
    material: Yup.string().max(100, "Material cannot exceed 100 characters"),
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
    washAndCare: Yup.string().max(
      500,
      "Instructions cannot exceed 500 characters"
    ),
  }),
});

const ItemController = () => {
  const { enqueueSnackbar } = useSnackbar();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const cancelToken = axios.CancelToken.source();

  const [data, setData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [imgUrls, setImgUrls] = useState([]);

  const [images, setImages] = useState([]);
  const [sizeChart, setSizeChart] = useState(null);
  const [selectedImage, setSelectedImage] = useState([null]);
  const [videoClip, setVideoClip] = useState(null);

  const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const formik = useFormik({
    initialValues: {
      itemTitle: "",
      itemDescription: "",
      itemIsActive: true,
      itemBasePrice: 0,
      itemPrice: 0,
      itemDiscount: 0,
      itemVariants: [],
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

  const handleSelectVariant = (variant) => {
    setSelectedVariant(selectedVariant === variant ? null : variant);
  };

  const handleOpenCloseItemUpdateDialog = () => {
    if (isOpenUpdateDialog) {
      setImages(
        data.itemVariants.flatMap((item) =>
          item.variantImages.map((image) => ({
            file: null,
            color: item.variantColor,
            fileUrl: image.imgUrl,
            status: "old",
          }))
        )
      );
      if (data.itemSizeChart && data.itemSizeChart.imgUrl) {
        setSizeChart({
          file: null,
          color: null,
          fileUrl: data.itemSizeChart.imgUrl,
          status: "old",
        });
      }

      if (data.itemVideoClip && data.itemVideoClip.videoUrl) {
        setVideoClip({
          file: null,
          url: data.itemVideoClip.videoUrl,
          status: "old",
        });
      }

      formik.setValues({
        itemTitle: data.itemTitle,
        itemDescription: data.itemDescription,
        itemIsActive: data.itemIsActive,
        itemVariants: data.itemVariants,
        itemBasePrice: data.itemBasePrice,
        itemPrice: data.itemPrice,
        itemDiscount: data.itemDiscount,
        itemInformation: data.itemInformation,
      });
    }
    setIsOpenUpdateDialog(!isOpenUpdateDialog);
  };

  const handleUpdateItem = async () => {
    commonUtil.validateFormik(formik);

    const uniqueColors = new Set(images.map((item) => item.color));

    if (
      uniqueColors.size !== formik.values.itemVariants.length ||
      images.length === 0 ||
      formik.values.itemVariants.length === 0
    ) {
      enqueueSnackbar("Images required", { variant: SNACKBAR_VARIANT.WARNING });
      return;
    }

    if (formik.isValid && formik.dirty) {
      setIsLoadingUpdate(true);

      const updatedVariants = formik.values.itemVariants.map(
        (variant, index) => {
          const variantColor = variant.variantColor
            .toLowerCase()
            .replace(/\s/g, "");

          const imgs = (variant.variantImages || [])
            .filter((image) =>
              image.imgUrl.toLowerCase().includes(variantColor)
            )
            .filter((image) =>
              images.some(
                (updatedImage) => updatedImage.fileUrl === image.imgUrl
              )
            )
            .map((image) => ({
              imgUrl: image.imgUrl,
              imgKey: image.imgKey,
              type: commonUtil.isUndefinedOrNull(image.type)
                ? "image"
                : "video",
            }));

          return {
            ...variant,
            variantImages: imgs,
          };
        }
      );

      const formdata = new FormData();
      images.map((item) => {
        if (item.status === "new") {
          formdata.append("file", item.file);
        }
      });
      if (sizeChart && sizeChart?.status === "new") {
        formdata.append("chart", sizeChart.file);
      }
      if (videoClip && videoClip?.status === "new") {
        formdata.append("video", videoClip.file);
      }
      const body = JSON.stringify({
        ...formik.values,
        itemVariants: updatedVariants,
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
          const resData = res.data.responseData;
          setData(resData);
          setImages(
            resData.itemVariants.flatMap((item) =>
              item.variantImages.map((image) => ({
                file: null,
                color: item.variantColor,
                fileUrl: image.imgUrl,
                status: "old",
                type: image.type,
              }))
            )
          );
          if (resData.itemSizeChart && resData.itemSizeChart.imgUrl) {
            setSizeChart({
              file: null,
              color: null,
              fileUrl: resData.itemSizeChart.imgUrl,
              status: "old",
            });
          }

          if (resData.itemVideoClip && resData.itemVideoClip.videoUrl) {
            setVideoClip({
              file: null,
              url: resData.itemVideoClip.videoUrl,
              status: "old",
            });
          }

          //setSelectedVariant(res.data.responseData.itemVariants[0]);

          setImgUrls(
            resData.itemVariants.flatMap((variant) =>
              variant.variantImages.map((image) => image)
            )
          );

          setSelectedImage(resData.itemVariants[0].variantImages[0]);

          formik.setValues({
            itemTitle: resData.itemTitle,
            itemDescription: resData.itemDescription,
            itemIsActive: resData.itemIsActive,
            itemVariants: resData.itemVariants,
            itemBasePrice: resData.itemBasePrice,
            itemPrice: resData.itemPrice,
            itemDiscount: resData.itemDiscount,
            itemInformation: resData.itemInformation,
          });
          handleImageClick(res.data.responseData.variantImages[0]);
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
      imgUrls={imgUrls}
      selectedVariant={selectedVariant}
      handleSelectVariant={handleSelectVariant}
      setImages={setImages}
      sizeChart={sizeChart}
      setSizeChart={setSizeChart}
      selectedImage={selectedImage}
      videoClip={videoClip}
      setVideoClip={setVideoClip}
      handleImageClick={handleImageClick}
      isOpenUpdateDialog={isOpenUpdateDialog}
      handleOpenCloseItemUpdateDialog={handleOpenCloseItemUpdateDialog}
      handleUpdateItem={handleUpdateItem}
      isLoadingUpdate={isLoadingUpdate}
    />
  );
};

export default ItemController;
