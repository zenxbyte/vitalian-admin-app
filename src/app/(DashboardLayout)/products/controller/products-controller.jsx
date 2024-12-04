"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

import { BACKEND_API } from "@/axios/constant/backend-api";
import { backendAuthApi } from "@/axios/instance/backend-axios-instance";
import responseUtil from "@/utils/responseUtil";
import commonUtil from "@/utils/common-util";
import { NAVIGATION_ROUTES } from "@/navigation/navigationRoutes";
import { ProductsView } from "../view/products-view.jsx";
import { SNACKBAR_VARIANT } from "@/constants/snackbar-constants.js";

const validationSchemaCreate = Yup.object().shape({
  catName: Yup.string().required("Category Name is required"),
  catDescription: Yup.string(),
});

const validationSchemaUpdate = Yup.object().shape({
  catName: Yup.string().required("Category Name is required"),
  catDescription: Yup.string(),
  catIsActive: Yup.boolean().default(true).required(),
});

const validationSchemaItem = Yup.object({
  itemTitle: Yup.string().required("Item title is required"),
  itemDescription: Yup.string(),
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
    })
  ),
  itemInformationSchema: Yup.object().shape({
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

const ProductsController = () => {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const cancelToken = axios.CancelToken.source();

  const [page, setPage] = useState(0);
  const [documentCount, setDocumentCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const [images, setImages] = useState([]);

  const [isOpenCatAddDialog, setIsOpenCatAddDialog] = useState(false);
  const [isOpenCatUpdateDialog, setIsOpenCatUpdateDialog] = useState(false);
  const [isOpenAddItemDialog, setIsOpenAddItemDialog] = useState(false);

  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingAddCat, setIsLoadingAddCat] = useState(false);
  const [isLoadingUpdateCat, setIsLoadingUpdateCat] = useState(false);
  const [isLoadingAddItem, setIsLoadingAddItem] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const formikCreate = useFormik({
    initialValues: {
      catName: "",
      catDescription: "",
    },
    validationSchema: validationSchemaCreate,
    onSubmit: () => {
      null;
    },
  });

  const formikUpdate = useFormik({
    initialValues: {
      catName: "",
      catDescription: "",
      catIsActive: true,
    },
    validationSchema: validationSchemaUpdate,
    onSubmit: () => {
      null;
    },
  });

  const formikAddItem = useFormik({
    initialValues: {
      itemTitle: "",
      itemDescription: "",
      itemBasePrice: 0,
      itemPrice: 0,
      itemDiscount: 0,
      itemVariants: [],
      itemInformation: {
        material: "",
        fitType: "",
        stretch: "",
        style: "",
        accessories: "",
        washAndCare: "",
      },
    },
    validationSchema: validationSchemaItem,
    onSubmit: () => {
      null;
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleOpenCloseCatDialog = () => {
    if (isOpenCatAddDialog) {
      formikCreate.resetForm();
    }
    setIsOpenCatAddDialog(!isOpenCatAddDialog);
  };

  const handleOpenCloseUpdateCatDialog = () => {
    if (isOpenCatUpdateDialog) {
      formikUpdate.resetForm();
    } else {
      formikUpdate.setValues({
        catName: selectedCat.catName,
        catDescription: selectedCat.catDescription,
      });
    }
    setIsOpenCatUpdateDialog(!isOpenCatUpdateDialog);
  };

  const handleOpenCloseAddItemDialog = () => {
    if (isOpenAddItemDialog) {
      formikAddItem.resetForm();
      setImages([]);
    }
    setIsOpenAddItemDialog(!isOpenAddItemDialog);
  };

  const handleSelectCat = (key) => {
    if (selectedCat && selectedCat._id === key) {
      setSelectedCat(null);
    } else {
      setSelectedCat(categories.find((cat) => cat._id === key));
    }
  };

  const handleClickItemRow = (id) => {
    router.push(NAVIGATION_ROUTES.item.id + id);
  };

  const handleAddNewCategory = async () => {
    commonUtil.validateFormik(formikCreate);

    if (formikCreate.isValid && formikCreate.dirty) {
      setIsLoadingAddCat(true);

      await backendAuthApi({
        url: BACKEND_API.PRODUCT_CAT_CREATE,
        method: "POST",
        cancelToken: cancelToken.token,
        data: formikCreate.values,
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            handleOpenCloseCatDialog();
            fetchCategories();
          }
        })
        .catch(() => {
          setIsLoadingAddCat(false);
        })
        .finally(() => {
          setIsLoadingAddCat(false);
        });
    }
  };

  const handleUpdateCategory = async () => {
    commonUtil.validateFormik(formikUpdate);
    if (formikUpdate.isValid && formikUpdate.dirty) {
      setIsLoadingUpdateCat(true);
      await backendAuthApi({
        url: BACKEND_API.PRODUCT_CAT_UPDATE + selectedCat._id,
        method: "PUT",
        cancelToken: cancelToken.token,
        data: formikUpdate.values,
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            handleOpenCloseUpdateCatDialog();
            fetchCategories();
          }
          enqueueSnackbar(res.data.responseMessage, {
            variant: responseUtil.findResponseType(res.data.responseCode),
          });
        })
        .catch(() => {
          setIsLoadingUpdateCat(false);
        })
        .finally(() => {
          setIsLoadingUpdateCat(false);
        });
    }
  };

  const handleAddItem = async () => {
    commonUtil.validateFormik(formikAddItem);

    const uniqueColors = new Set(images.map((item) => item.color));

    if (
      uniqueColors.size !== formikAddItem.values.itemVariants.length ||
      images.length === 0 ||
      formikAddItem.values.itemVariants.length === 0
    ) {
      enqueueSnackbar("Images required", { variant: SNACKBAR_VARIANT.WARNING });
      return;
    }

    if (formikAddItem.isValid && formikAddItem.dirty) {
      setIsLoadingAddItem(true);

      const data = new FormData();
      images.map((item) => {
        data.append("file", item.file);
      });
      const body = JSON.stringify(formikAddItem.values);
      data.append("data", body);

      await backendAuthApi({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: BACKEND_API.ITEM_ADD + selectedCat._id,
        method: "POST",
        cancelToken: cancelToken.token,
        data: data,
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            handleOpenCloseAddItemDialog();
            fetchItems();
          }
        })
        .catch(() => {
          setIsLoadingAddItem(false);
        })
        .finally(() => {
          setIsLoadingAddItem(false);
        });
    }
  };

  const fetchItems = async () => {
    if (selectedCat) {
      setIsLoadingItems(true);

      await backendAuthApi({
        url: BACKEND_API.ITEM_GET_BY_CAT + selectedCat._id,
        method: "GET",
        cancelToken: cancelToken.token,
        params: {
          page: page,
          limit: rowsPerPage,
        },
      })
        .then((res) => {
          if (responseUtil.isResponseSuccess(res.data.responseCode)) {
            setItems(res.data.responseData.result);
            setDocumentCount(res.data.responseData.count);
          }
        })
        .catch(() => {
          setIsLoadingItems(false);
        })
        .finally(() => {
          setIsLoadingItems(false);
        });
    }
  };

  const fetchCategories = async () => {
    setIsLoadingCategories(true);

    await backendAuthApi({
      url: BACKEND_API.PRODUCT_CAT_GET,
      method: "GET",
      cancelToken: cancelToken.token,
    })
      .then((res) => {
        if (responseUtil.isResponseSuccess(res.data.responseCode)) {
          setCategories(res.data.responseData);
        }
      })
      .catch((e) => {
        setIsLoadingCategories(false);
      })
      .finally(() => {
        setIsLoadingCategories(false);
      });
  };

  useEffect(() => {
    if (selectedCat) {
      fetchItems();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCat, rowsPerPage, page]);

  useEffect(() => {
    fetchCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ProductsView
      categories={categories}
      isLoadingCategories={isLoadingCategories}
      selectedCat={selectedCat}
      handleSelectCat={handleSelectCat}
      images={images}
      setImages={setImages}
      formikCreate={formikCreate}
      formikUpdate={formikUpdate}
      formikAddItem={formikAddItem}
      isOpenCatAddDialog={isOpenCatAddDialog}
      isOpenCatUpdateDialog={isOpenCatUpdateDialog}
      isOpenAddItemDialog={isOpenAddItemDialog}
      handleOpenCloseCatDialog={handleOpenCloseCatDialog}
      handleOpenCloseUpdateCatDialog={handleOpenCloseUpdateCatDialog}
      handleOpenCloseAddItemDialog={handleOpenCloseAddItemDialog}
      isLoadingAddCat={isLoadingAddCat}
      isLoadingUpdateCat={isLoadingUpdateCat}
      isLoadingAddItem={isLoadingAddItem}
      handleAddNewCategory={handleAddNewCategory}
      handleUpdateCategory={handleUpdateCategory}
      handleAddItem={handleAddItem}
      items={items}
      isLoadingItems={isLoadingItems}
      handleClickItemRow={handleClickItemRow}
      page={page}
      documentCount={documentCount}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default ProductsController;
