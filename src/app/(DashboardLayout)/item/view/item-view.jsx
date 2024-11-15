"use client";

import React from "react";
import {
  Box,
  Breadcrumbs,
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
import { CustomTableHead } from "@/components/custom-table/custom-table-head";
import { SizeComponent } from "../component/sizeComponent";

export const ItemView = ({
  isLoading,
  data,
  selectedImage,
  handleImageClick,
}) => {
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <PageContainer title={"Item"}>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 12 }}>
            <Breadcrumbs aria-label="breadcrumb" separator="›">
              <Link underline="hover" color="inherit" href="/products">
                Products
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                Item {!isLoading && `[ ${data.itemTitle} ]`}
              </Typography>
            </Breadcrumbs>
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
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <SizeComponent data={data} />
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};
