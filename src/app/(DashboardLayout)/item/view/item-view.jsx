"use client";

import React from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  CardMedia,
  Chip,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import PageContainer from "@/components/container/PageContainer.jsx";
import Loading from "@/app/loading.jsx";
import { formatCurrency } from "@/utils/format-number";
import { COLORS } from "@/constants/colors-constatns";
import { SizeComponent } from "../component/sizeComponent";
import { ItemUpdateDialog } from "../component/itemUpdateDialog";

export const ItemView = ({
  formik,
  isLoading,
  data,
  images,
  setImages,
  selectedImage,
  handleImageClick,
  isOpenUpdateDialog,
  handleOpenCloseItemUpdateDialog,
  handleUpdateItem,
  isLoadingUpdate,
}) => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
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
            <Grid container spacing={2}>
              {data.itemImages.map((image, index) => (
                <Grid key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      cursor: "pointer",
                      border:
                        selectedImage.imgKey === image.imgKey
                          ? "1px solid black"
                          : "none",
                    }}
                    onClick={() => handleImageClick(image)}
                  >
                    <CardMedia
                      component="img"
                      image={image.imgUrl}
                      alt={`Thumbnail ${index + 1}`}
                      sx={{
                        width: matchDownSM ? 30 : 60,
                        height: matchDownSM ? 40 : 80,
                        objectFit: "cover",
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
              <Grid size={{ xs: 12, sm: 12 }}>
                <Box
                  sx={{
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                    height: 400,
                    width: "100%",
                    borderRadius: 2,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={selectedImage.imgUrl}
                    alt="Selected Product Image"
                    sx={{
                      width: "100%",
                      height: 400,
                      objectFit: "contain",
                      borderRadius: 2,
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
                <Typography variant="subtitle1">Price</Typography>
                <Box flexGrow={1} />
                <Typography variant="subtitle1">
                  {formatCurrency(data.itemPrice)}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="subtitle1">Discount Percentage</Typography>
                <Box flexGrow={1} />
                <Typography variant="subtitle1">
                  {data.itemDiscount} %
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Typography variant="subtitle1">Color</Typography>
                <Box flexGrow={1} />
                <Typography variant="subtitle1">{data.itemColor}</Typography>
                <Box
                  sx={{
                    ml: "10px",
                    width: "20px",
                    height: "20px",
                    bgcolor: COLORS.find((item) => item.key === data.itemColor)
                      .hexValue,
                    borderRadius: "50%",
                  }}
                />
              </Box>
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
          <Grid size={{ xs: 12, sm: 4 }}>
            <SizeComponent data={data} />
          </Grid>
        </Grid>
      )}
      {isOpenUpdateDialog && (
        <ItemUpdateDialog
          formik={formik}
          isOpen={isOpenUpdateDialog}
          handleClose={handleOpenCloseItemUpdateDialog}
          images={images}
          setImages={setImages}
          handleSubmit={handleUpdateItem}
          isLoading={isLoadingUpdate}
        />
      )}
    </PageContainer>
  );
};
