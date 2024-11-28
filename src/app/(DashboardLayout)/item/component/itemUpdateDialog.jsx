import React, { Fragment, useState } from "react";

import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
  Slide,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AddCircleRounded } from "@mui/icons-material";

import { CurrencyInput } from "@/components/currency-input/currency-input";
import DropFileContainer from "@/components/DropFileContainer/dropFileContainer";
import { COLORS } from "@/constants/colors-constatns";
import { SelectSizeDialog } from "../../products/components/selectSizeDialog";
import { AddColorDialog } from "./addColorDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ItemUpdateDialog = ({
  isOpen,
  handleClose,
  images,
  setImages,
  formik,
  isLoading,
  handleSubmit,
}) => {
  const { touched, errors, getFieldProps, values, setFieldValue } = formik;

  const [color, setColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [isOpenColorDlg, setIsOpenColorDlg] = useState(false);
  const [isOpenImgDlg, setIsOpenImgDlg] = useState(false);
  const [isOpenSizeDlg, setIsOpenSizeDlg] = useState(false);

  const handleAddImage = (newImage) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleRemoveImages = (imgIndex) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== imgIndex));
  };

  const handleOpenCloseImgDialog = (color) => {
    setSelectedColor(isOpenImgDlg ? null : color);
    setIsOpenImgDlg(!isOpenImgDlg);
  };

  const handleOpenCloseColorDialog = () => {
    if (isOpenColorDlg) {
      setColor("");
    }
    setIsOpenColorDlg(!isOpenColorDlg);
  };

  const handleOpenCloseSizeDialog = (index) => {
    setSelectedVariant(isOpenSizeDlg ? null : index);
    setIsOpenSizeDlg(!isOpenSizeDlg);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleAddVariant = () => {
    const isExist = values.itemVariants.find(
      (item) => item.itemColor === color
    );

    if (!isExist) {
      setFieldValue("itemVariants", [
        ...values.itemVariants,
        { itemColor: color, itemSizes: [] },
      ]);
      handleOpenCloseColorDialog();
    }
  };

  const handleSelectSize = (e) => {
    const isExist =
      values.itemVariants[selectedVariant].itemSizes &&
      values.itemVariants[selectedVariant].itemSizes.find(
        (item) => item.size === e.target.value
      );

    if (!isExist) {
      setFieldValue(`itemVariants[${selectedVariant}].itemSizes`, [
        ...values.itemVariants[selectedVariant].itemSizes,
        { size: e.target.value, availability: true, quantity: 0 },
      ]);
      handleOpenCloseSizeDialog();
    }
  };

  const handleRemoveSize = (variantIndex, index) => {
    const updatedSizes = values.itemVariants[variantIndex].itemSizes.filter(
      (_, i) => i !== index
    );
    setFieldValue(`itemVariants[${variantIndex}].itemSizes`, updatedSizes);
  };

  return (
    <Fragment>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              disabled={isLoading}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update Product Item
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: "20px", mb: "50px" }}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography variant="h6">Item Details</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemTitle"
                label="Item Title"
                required
                fullWidth
                {...getFieldProps("itemTitle")}
                error={Boolean(touched.itemTitle && errors.itemTitle)}
                helperText={touched.itemTitle && errors.itemTitle}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemDescription"
                label="Item Description"
                fullWidth
                {...getFieldProps("itemDescription")}
                error={Boolean(
                  touched.itemDescription && errors.itemDescription
                )}
                helperText={touched.itemDescription && errors.itemDescription}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CurrencyInput
                label="Item Price"
                name="itemPrice"
                fullWidth
                required
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("itemPrice")}
                error={Boolean(touched.itemPrice && errors.itemPrice)}
                helperText={touched.itemPrice && errors.itemPrice}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Discount"
                name="itemDiscount"
                type="number"
                fullWidth
                slotProps={{
                  input: {
                    slotProps: {
                      max: 100, // Sets the maximum value to 100
                      min: 0,
                    },
                    startAdornment: (
                      <InputAdornment position="end">% </InputAdornment>
                    ),
                  },
                }}
                {...getFieldProps("itemDiscount")}
                error={Boolean(touched.itemDiscount && errors.itemDiscount)}
                helperText={touched.itemDiscount && errors.itemDiscount}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Typography variant="h6">Other Informations</Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.material"
                label="Material"
                fullWidth
                {...getFieldProps("itemInformation.material")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.color"
                label="Color"
                fullWidth
                {...getFieldProps("itemInformation.color")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.fitType"
                label="Fit Type"
                fullWidth
                {...getFieldProps("itemInformation.fitType")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.stretch"
                label="Stretch Type"
                fullWidth
                {...getFieldProps("itemInformation.stretch")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.style"
                label="Style"
                fullWidth
                {...getFieldProps("itemInformation.style")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.accessories"
                label="Accessories"
                fullWidth
                {...getFieldProps("itemInformation.accessories")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.modelSize"
                label="Model Size"
                fullWidth
                {...getFieldProps("itemInformation.modelSize")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="itemInformation.washAndCare"
                label="Wash & Care"
                fullWidth
                {...getFieldProps("itemInformation.washAndCare")}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Item Variants</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddCircleRounded />}
                  onClick={handleOpenCloseColorDialog}
                >
                  Add
                </Button>
              </Box>
            </Grid>
            {values.itemVariants && values.itemVariants.length > 0 && (
              <>
                {formik.values.itemVariants.map((item, index) => (
                  <Grid key={index} size={{ xs: 12, md: 12 }}>
                    <Box>
                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 8 }}>
                          <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography variant="h6">
                              COLOR : {item.itemColor.toUpperCase()}
                            </Typography>
                            <Box display="flex" flexDirection="row" gap={2}>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  handleOpenCloseImgDialog(item.itemColor)
                                }
                              >
                                Add Images
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={() => handleOpenCloseSizeDialog(index)}
                              >
                                Add Sizes
                              </Button>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 8 }}>
                          <ImageList cols={4}>
                            {images.map((img, imgIndex) => {
                              const filteredImages =
                                img.color === item.itemColor;

                              if (filteredImages) {
                                return (
                                  <ImageListItem key={imgIndex}>
                                    <img
                                      src={img.fileUrl}
                                      alt={"Image"}
                                      loading="lazy"
                                    />
                                    <ImageListItemBar
                                      sx={{
                                        background:
                                          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                      }}
                                      title={item.title}
                                      position="top"
                                      actionIcon={
                                        <IconButton
                                          sx={{ color: "white" }}
                                          onClick={() =>
                                            handleRemoveImages(imgIndex)
                                          }
                                        >
                                          <CancelIcon />
                                        </IconButton>
                                      }
                                      actionPosition="left"
                                    />
                                  </ImageListItem>
                                );
                              }
                            })}
                          </ImageList>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          {values.itemVariants[index].itemSizes.length > 0 && (
                            <Box display="flex" flexDirection="column" gap={2}>
                              {values.itemVariants[index].itemSizes.map(
                                (item, subIndex) => (
                                  <Box
                                    key={subIndex}
                                    display="flex"
                                    flexDirection="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    <Typography>{item.size}</Typography>
                                    <Box
                                      display="flex"
                                      flexDirection="row"
                                      gap={2}
                                      justifyContent="flex-end"
                                      alignItems="center"
                                    >
                                      <TextField
                                        type="number"
                                        name={`itemVariants[${index}].itemSizes[${subIndex}].quantity`}
                                        label="Quantity"
                                        fullWidth
                                        inputProps={{ min: 0 }}
                                        sx={{ maxWidth: "200px" }}
                                        {...getFieldProps(
                                          `itemVariants[${index}].itemSizes[${subIndex}].quantity`
                                        )}
                                        error={Boolean(
                                          touched.itemVariants &&
                                            touched.itemVariants[index] &&
                                            touched.itemVariants[index]
                                              .itemSizes &&
                                            touched.itemVariants[index]
                                              .itemSizes[subIndex] &&
                                            touched.itemVariants[index]
                                              .itemSizes[subIndex].quantity &&
                                            errors.itemVariants &&
                                            errors.itemVariants[index] &&
                                            errors.itemVariants[index]
                                              .itemSizes &&
                                            errors.itemVariants[index]
                                              .itemSizes[subIndex] &&
                                            errors.itemVariants[index]
                                              .itemSizes[subIndex].quantity
                                        )}
                                        helperText={
                                          touched.itemVariants &&
                                          touched.itemVariants[index] &&
                                          touched.itemVariants[index]
                                            .itemSizes &&
                                          touched.itemVariants[index].itemSizes[
                                            subIndex
                                          ] &&
                                          errors.itemVariants &&
                                          errors.itemVariants[index] &&
                                          errors.itemVariants[index]
                                            .itemSizes &&
                                          errors.itemVariants[index].itemSizes[
                                            subIndex
                                          ] &&
                                          errors.itemVariants[index].itemSizes[
                                            subIndex
                                          ].quantity
                                            ? errors.itemVariants[index]
                                                .itemSizes[subIndex].quantity
                                            : ""
                                        }
                                      />
                                      <IconButton
                                        onClick={() =>
                                          handleRemoveSize(index, subIndex)
                                        }
                                      >
                                        <CancelIcon fontSize="inherit" />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                )
                              )}
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Container>
      </Dialog>
      {isOpenImgDlg && (
        <DropFileContainer
          open={isOpenImgDlg}
          onClose={handleOpenCloseImgDialog}
          onSave={handleAddImage}
          color={selectedColor}
        />
      )}
      {isOpenColorDlg && (
        <AddColorDialog
          isOpen={isOpenColorDlg}
          handleClose={handleOpenCloseColorDialog}
          color={color}
          handleChangeColor={handleChangeColor}
          handleAddVariant={handleAddVariant}
        />
      )}
      {isOpenSizeDlg && (
        <SelectSizeDialog
          isOpen={isOpenSizeDlg}
          handleClose={handleOpenCloseSizeDialog}
          handleSelect={handleSelectSize}
        />
      )}
    </Fragment>
  );
};
