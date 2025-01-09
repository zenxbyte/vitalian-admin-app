"use client";

import React from "react";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  CardMedia,
  ImageList,
  ImageListItem,
  Link,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import PageContainer from "@/components/container/PageContainer.jsx";
import Loading from "@/app/loading.jsx";
import { formatCurrency } from "@/utils/format-number";
import { SizeComponent } from "../component/sizeComponent.jsx";
import { ItemUpdateDialog } from "../component/itemUpdateDialog.jsx";
import commonUtil from "@/utils/common-util.js";

export const ItemView = ({
  formik,
  isLoading,
  data,
  images,
  imgUrls,
  setImages,
  sizeChart,
  setSizeChart,
  selectedVariant,
  handleSelectVariant,
  selectedImage,
  handleImageClick,
  isOpenUpdateDialog,
  handleOpenCloseItemUpdateDialog,
  handleUpdateItem,
  isLoadingUpdate,
}) => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const filteredImages = selectedVariant
    ? imgUrls.filter((img) =>
        img.imgUrl.includes(
          selectedVariant.variantColor.toLowerCase().replace(/\s+/g, "")
        )
      )
    : imgUrls;

  return (
    <PageContainer title={"Item"}>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              <Link underline="hover" color="inherit" href="/products">
                Products
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Item {!isLoading && `[ ${data.itemTitle} ]`}
              </Typography>
            </Breadcrumbs>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                variant="outlined"
                onClick={handleOpenCloseItemUpdateDialog}
              >
                Update Item
              </Button>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Grid container spacing={1}>
              <Grid size={{ xs: 12, sm: 12 }}>
                <ImageList cols={6}>
                  {filteredImages.map((image, index) => (
                    <ImageListItem
                      key={index}
                      onClick={() => handleImageClick(image)}
                    >
                      <img
                        src={image.imgUrl}
                        alt={"Image"}
                        loading="lazy"
                        sx={{
                          cursor: "pointer",
                          border:
                            selectedImage.imgKey === image.imgKey
                              ? "1px solid black"
                              : "none",
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
              <Grid size={{ xs: 12, sm: 12 }}>
                <Box
                  sx={{
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                    //height: 400,
                    width: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={selectedImage.imgUrl}
                    alt="Selected Product Image"
                    sx={{
                      width: "100%",
                      //height: 400,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h5">{data.itemTitle}</Typography>
              {data.itemDescription && (
                <Typography variant="h6">{data.itemDescription}</Typography>
              )}
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1">Item Status</Typography>
                <Box flexGrow={1} />
                <Typography variant="subtitle1">
                  {data.itemIsActive ? "Active" : "Not Active"}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1">Base Price</Typography>
                <Box flexGrow={1} />
                <Box display="flex" flexDirection="row" gap={1}>
                  <Typography variant="subtitle1">
                    {formatCurrency(data.itemBasePrice)}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1">Price</Typography>
                <Box flexGrow={1} />
                <Box display="flex" flexDirection="row" gap={1}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textDecoration:
                        data.itemDiscount > 0 ? "line-through" : "none",
                    }}
                  >
                    {formatCurrency(data.itemPrice)}
                  </Typography>
                  {data.itemDiscount > 0 && (
                    <Typography variant="subtitle1" fontWeight="bold">
                      {formatCurrency(
                        commonUtil.calculateDiscountPrice(
                          data.itemDiscount,
                          data.itemPrice
                        )
                      )}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1">Discount Percentage</Typography>
                <Box flexGrow={1} />
                <Typography variant="subtitle1">
                  {data.itemDiscount} %
                </Typography>
              </Box>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {data.itemVariants.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Avatar
                      alt={item.variantColor}
                      src={item.variantImages[0].imgUrl}
                      onClick={() => handleSelectVariant(item)}
                      sx={{
                        border:
                          selectedVariant &&
                          selectedVariant.variantColor === item.variantColor
                            ? "1px solid black"
                            : "none",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {item.variantColor}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              {/* <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="subtitle1">Color</Typography>
                <Box flexGrow={1} />
                <Typography variant="subtitle1">{data.variantColor}</Typography>
                <Box
                  sx={{
                    ml: "10px",
                    width: "20px",
                    height: "20px",
                    bgcolor: COLORS.find((item) => item.key === data.variantColor)
                      .hexValue,
                    borderRadius: "50%",
                  }}
                />
              </Box> */}
              <Typography variant="h6">Other Information</Typography>
              {data.itemInformation.material && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Material</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.material}
                  </Typography>
                </Box>
              )}
              {data.itemInformation.color && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Color</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.color}
                  </Typography>
                </Box>
              )}
              {data.itemInformation.fitType && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Fit Type</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.fitType}
                  </Typography>
                </Box>
              )}
              {data.itemInformation.stretch && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Stretch</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.stretch}
                  </Typography>
                </Box>
              )}
              {data.itemInformation.style && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Style</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.style}
                  </Typography>
                </Box>
              )}
              {data.itemInformation.accessories && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Accessories</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.accessories}
                  </Typography>
                </Box>
              )}
              {data.itemInformation.modelSize && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Model Size</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.modelSize}
                  </Typography>
                </Box>
              )}
              {data.itemInformation.washAndCare && (
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Typography variant="subtitle1">Wash & Care</Typography>
                  <Box flexGrow={1} />
                  <Typography variant="subtitle1">
                    {data.itemInformation.washAndCare}
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          {selectedVariant && (
            <Grid size={{ xs: 12, sm: 4 }}>
              <SizeComponent data={selectedVariant} />
            </Grid>
          )}
        </Grid>
      )}
      {isOpenUpdateDialog && (
        <ItemUpdateDialog
          formik={formik}
          isOpen={isOpenUpdateDialog}
          handleClose={handleOpenCloseItemUpdateDialog}
          images={images}
          setImages={setImages}
          sizeChart={sizeChart}
          setSizeChart={setSizeChart}
          handleSubmit={handleUpdateItem}
          isLoading={isLoadingUpdate}
        />
      )}
    </PageContainer>
  );
};
