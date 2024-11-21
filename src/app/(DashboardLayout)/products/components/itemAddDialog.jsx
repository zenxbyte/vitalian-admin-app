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
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { AddCircleRounded } from "@mui/icons-material";

import { CurrencyInput } from "@/components/currency-input/currency-input";
import DropFileContainer from "@/components/DropFileContainer/dropFileContainer";
import { COLORS } from "@/constants/colors-constatns";
import { SelectSizeDialog } from "./selectSizeDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ItemAddDialog = ({
  isOpen,
  handleClose,
  images,
  setImages,
  formik,
  isLoading,
  handleSubmit,
}) => {
  const {
    touched,
    errors,
    getFieldProps,
    values,
    setFieldValue,
    handleChange,
    handleBlur,
  } = formik;

  const [isOpenImgDlg, setIsOpenImgDlg] = useState(false);
  const [isOpenSizeDlg, setIsOpenSizeDlg] = useState(false);

  const handleAddImage = (newImage) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleRemoveImages = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleOpenCloseImgDialog = () => {
    setIsOpenImgDlg(!isOpenImgDlg);
  };

  const handleOpenCloseSizeDialog = () => {
    setIsOpenSizeDlg(!isOpenSizeDlg);
  };

  const handleSelectSize = (e) => {
    const isExist = values.itemSizes.find(
      (item) => item.size === e.target.value
    );
    if (!isExist) {
      setFieldValue("itemSizes", [
        ...values.itemSizes,
        { size: e.target.value, availability: true, quantity: 0 },
      ]);
      handleOpenCloseSizeDialog();
    }
  };

  const handleRemoveSize = (index) => {
    const updatedSizes = values.itemSizes.filter((_, i) => i !== index);
    setFieldValue("itemSizes", updatedSizes);
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
              Add Item
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
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Item Images</Typography>
                <Button
                  variant="contained"
                  disabled={images.length === 5}
                  startIcon={<AddPhotoAlternateIcon />}
                  onClick={handleOpenCloseImgDialog}
                >
                  Add
                </Button>
              </Box>
            </Grid>
            {images.length > 0 && (
              <Grid size={{ xs: 12, md: 12 }}>
                <ImageList sx={{ height: 320 }} cols={5}>
                  {images.map((item, index) => (
                    <ImageListItem key={index}>
                      <img src={item.fileUrl} alt={"Image"} loading="lazy" />
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
                            onClick={() => handleRemoveImages(index)}
                          >
                            <CancelIcon />
                          </IconButton>
                        }
                        actionPosition="left"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            )}

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
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="color-select">Color</InputLabel>
                <Select
                  labelId="color-select"
                  id="color-select"
                  name="itemColor"
                  label="Color"
                  {...getFieldProps("itemColor")}
                >
                  {COLORS.map((color, index) => (
                    <MenuItem key={index} value={color.key}>
                      {color.key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">Size Variants</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddCircleRounded />}
                    onClick={handleOpenCloseSizeDialog}
                  >
                    Add
                  </Button>
                </Box>
                {formik.values.itemSizes.length > 0 && (
                  <>
                    {formik.values.itemSizes.map((item, index) => (
                      <Box
                        key={index}
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
                            name={`itemSizes[${index}].quantity`}
                            label="Quantity"
                            fullWidth
                            sx={{ maxWidth: "200px" }}
                            value={values.itemSizes[index].quantity}
                            onChange={(e) => {
                              const { value } = e.target;
                              handleChange(`itemSizes[${index}].quantity`)(e);
                            }}
                            onBlur={handleBlur(`itemSizes[${index}].quantity`)}
                            error={Boolean(
                              touched.itemSizes &&
                                touched.itemSizes[index] &&
                                touched.itemSizes[index].quantity &&
                                errors.itemSizes &&
                                errors.itemSizes[index] &&
                                errors.itemSizes[index].quantity
                            )}
                            helperText={
                              (touched.itemSizes &&
                                touched.itemSizes[index] &&
                                touched.itemSizes[index].quantity &&
                                errors.itemSizes &&
                                errors.itemSizes[index] &&
                                errors.itemSizes[index].quantity) ||
                              ""
                            }
                          />
                          <IconButton onClick={() => handleRemoveSize(index)}>
                            <CancelIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                display="flex"
                flexDirection="column"
                gap={2}
                alignItems="center"
              >
                <Typography variant="h6" textAlign="center">
                  Other Informations
                </Typography>
                <TextField
                  name="itemInformation.material"
                  label="Material"
                  fullWidth
                  {...getFieldProps("itemInformation.material")}
                  // error={Boolean(
                  //   touched.itemInformation.material &&
                  //     errors.itemInformation.material
                  // )}
                  // helperText={
                  //   touched.itemInformation.material &&
                  //   errors.itemInformation.material
                  // }
                />
                <TextField
                  name="itemInformation.color"
                  label="Color"
                  fullWidth
                  {...getFieldProps("itemInformation.color")}
                  // error={Boolean(
                  //   touched.itemInformation.color &&
                  //     errors.itemInformation.color
                  // )}
                  // helperText={
                  //   touched.itemInformation.color &&
                  //   errors.itemInformation.color
                  // }
                />
                <TextField
                  name="itemInformation.fitType"
                  label="Fit Type"
                  fullWidth
                  {...getFieldProps("itemInformation.fitType")}
                  // error={Boolean(
                  //   touched.itemInformation.fitType &&
                  //     errors.itemInformation.fitType
                  // )}
                  // helperText={
                  //   touched.itemInformation.fitType &&
                  //   errors.itemInformation.fitType
                  // }
                />
                <TextField
                  name="itemInformation.stretch"
                  label="Stretch Type"
                  fullWidth
                  {...getFieldProps("itemInformation.stretch")}
                  // error={Boolean(
                  //   touched.itemInformation.stretch &&
                  //     errors.itemInformation.stretch
                  // )}
                  // helperText={
                  //   touched.itemInformation.stretch &&
                  //   errors.itemInformation.stretch
                  // }
                />
                <TextField
                  name="itemInformation.style"
                  label="Style"
                  fullWidth
                  {...getFieldProps("itemInformation.style")}
                  // error={Boolean(
                  //   touched.itemInformation.style &&
                  //     errors.itemInformation.style
                  // )}
                  // helperText={
                  //   touched.itemInformation.style &&
                  //   errors.itemInformation.style
                  // }
                />
                <TextField
                  name="itemInformation.accessories"
                  label="Accessories"
                  fullWidth
                  {...getFieldProps("itemInformation.accessories")}
                  // error={Boolean(
                  //   touched.itemInformation.accessories &&
                  //     errors.itemInformation.accessories
                  // )}
                  // helperText={
                  //   touched.itemInformation.accessories &&
                  //   errors.itemInformation.accessories
                  // }
                />
                <TextField
                  name="itemInformation.modelSize"
                  label="Model Size"
                  fullWidth
                  {...getFieldProps("itemInformation.modelSize")}
                  // error={Boolean(
                  //   touched.itemInformation.modelSize &&
                  //     errors.itemInformation.modelSize
                  // )}
                  // helperText={
                  //   touched.itemInformation.modelSize &&
                  //   errors.itemInformation.modelSize
                  // }
                />
                <TextField
                  name="itemInformation.washAndCare"
                  label="Wash & Care"
                  fullWidth
                  {...getFieldProps("itemInformation.washAndCare")}
                  // error={Boolean(
                  //   touched.itemInformation.washAndCare &&
                  //     errors.itemInformation.washAndCare
                  // )}
                  // helperText={
                  //   touched.itemInformation.washAndCare &&
                  //   errors.itemInformation.washAndCare
                  // }
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
      {isOpenImgDlg && (
        <DropFileContainer
          open={isOpenImgDlg}
          onClose={handleOpenCloseImgDialog}
          onSave={handleAddImage}
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
