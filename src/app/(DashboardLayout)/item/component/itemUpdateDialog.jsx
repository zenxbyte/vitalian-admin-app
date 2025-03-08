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
import { AddCircleRounded } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";

import { CurrencyInput } from "@/components/currency-input/currency-input";
import DropFileContainer from "@/components/DropFileContainer/dropFileContainer";
import { SelectSizeDialog } from "../../products/components/selectSizeDialog";
import { AddColorDialog } from "./addColorDialog";
import { VideoUploadDialog } from "@/components/video-upload-dialog/videoUploadDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ItemUpdateDialog = ({
  isOpen,
  handleClose,
  images,
  setImages,
  sizeChart,
  setSizeChart,
  videoClip,
  setVideoClip,
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

  const [color, setColor] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [isOpenColorDlg, setIsOpenColorDlg] = useState(false);
  const [isOpenImgDlg, setIsOpenImgDlg] = useState(false);
  const [isOpenChartImgDlg, setIsOpenChartImgDlg] = useState(false);
  const [isOpenSizeDlg, setIsOpenSizeDlg] = useState(false);
  const [isOpenVideoDlg, setIsOpenVideoDlg] = useState(false);

  const handleAddImage = (newImage) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  const handleRemoveImages = (imgIndex) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== imgIndex));
  };

  const handleAddSizeChart = (chartImg) => {
    setSizeChart(chartImg);
    setFieldValue("itemSizeChart", { imgUrl: null, imgKey: null });
  };

  const handleRemoveChart = () => {
    setSizeChart(null);
  };

  const handleOpenCloseImgDialog = (color) => {
    setSelectedColor(isOpenImgDlg ? null : color);
    setIsOpenImgDlg(!isOpenImgDlg);
  };

  const handleOpenCloseChartImgDialog = () => {
    setIsOpenChartImgDlg(!isOpenChartImgDlg);
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

  const handleOpenCloseVideoDialog = () => {
    setIsOpenVideoDlg(!isOpenVideoDlg);
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };

  const handleAddVariant = () => {
    const isExist = values.itemVariants.find(
      (item) => item.variantColor === color
    );

    if (!isExist) {
      setFieldValue("itemVariants", [
        ...values.itemVariants,
        { _id: null, variantColor: color, variantSizes: [] },
      ]);
      handleOpenCloseColorDialog();
    }
  };

  const handleSelectSize = (e) => {
    const isExist =
      values.itemVariants[selectedVariant].variantSizes &&
      values.itemVariants[selectedVariant].variantSizes.find(
        (item) => item.size === e.target.value
      );

    if (!isExist) {
      setFieldValue(`itemVariants[${selectedVariant}].variantSizes`, [
        ...values.itemVariants[selectedVariant].variantSizes,
        { size: e.target.value, availability: true, quantity: 0 },
      ]);
      handleOpenCloseSizeDialog();
    }
  };

  const handleRemoveSize = (variantIndex, index) => {
    const updatedSizes = values.itemVariants[variantIndex].variantSizes.filter(
      (_, i) => i !== index
    );
    setFieldValue(`itemVariants[${variantIndex}].variantSizes`, updatedSizes);
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
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel id="select-label">Status</InputLabel>
                <Select
                  labelId="select-label"
                  id="simple-select"
                  label="Status"
                  name="itemIsActive"
                  value={values.itemIsActive}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Not Active</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <CurrencyInput
                label="Item Base Price"
                name="itemBasePrice"
                fullWidth
                required
                autoComplete="off"
                variant="outlined"
                {...getFieldProps("itemBasePrice")}
                error={Boolean(touched.itemBasePrice && errors.itemBasePrice)}
                helperText={touched.itemBasePrice && errors.itemBasePrice}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
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
            <Grid size={{ xs: 9, md: 10 }}>
              <Typography variant="h6">Size Chart</Typography>
            </Grid>
            <Grid size={{ xs: 3, md: 2 }}>
              <Button
                fullWidth
                startIcon={<AddCircleRounded />}
                variant="contained"
                onClick={handleOpenCloseChartImgDialog}
              >
                Add
              </Button>
            </Grid>
            {sizeChart && (
              <Grid size={{ xs: 12, sm: 12 }}>
                <ImageList cols={4}>
                  <ImageListItem>
                    <img
                      src={sizeChart?.fileUrl}
                      alt={"Image"}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                          "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                      }}
                      title="Size Chart"
                      position="top"
                      actionIcon={
                        <IconButton
                          sx={{ color: "white" }}
                          onClick={() => handleRemoveChart()}
                        >
                          <CancelIcon />
                        </IconButton>
                      }
                      actionPosition="left"
                    />
                  </ImageListItem>
                </ImageList>
              </Grid>
            )}
            <Grid size={{ xs: 9, md: 10 }}>
              <Typography variant="h6">Video Clip</Typography>
            </Grid>
            <Grid size={{ xs: 3, md: 2 }}>
              {!videoClip ? (
                <Button
                  fullWidth
                  startIcon={<AddCircleRounded />}
                  variant="contained"
                  onClick={handleOpenCloseVideoDialog}
                >
                  Add
                </Button>
              ) : (
                <Button
                  fullWidth
                  startIcon={<ClearIcon />}
                  variant="contained"
                  onClick={() => setVideoClip(null)}
                >
                  Clear
                </Button>
              )}
            </Grid>
            {videoClip && (
              <Grid size={{ xs: 12, sm: 12 }}>
                <Box sx={{ width: "300px" }}>
                  <video
                    src={videoClip?.url}
                    controls
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                </Box>
              </Grid>
            )}
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
                              COLOR : {item.variantColor.toUpperCase()}
                            </Typography>
                            <Box display="flex" flexDirection="row" gap={2}>
                              <Button
                                variant="outlined"
                                onClick={() =>
                                  handleOpenCloseImgDialog(item.variantColor)
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
                                img.color === item.variantColor;

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
                          {values.itemVariants[index].variantSizes.length >
                            0 && (
                            <Box display="flex" flexDirection="column" gap={2}>
                              {values.itemVariants[index].variantSizes.map(
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
                                        name={`itemVariants[${index}].variantSizes[${subIndex}].quantity`}
                                        label="Quantity"
                                        fullWidth
                                        inputProps={{ min: 0 }}
                                        sx={{ maxWidth: "200px" }}
                                        {...getFieldProps(
                                          `itemVariants[${index}].variantSizes[${subIndex}].quantity`
                                        )}
                                        error={Boolean(
                                          touched.itemVariants &&
                                            touched.itemVariants[index] &&
                                            touched.itemVariants[index]
                                              .variantSizes &&
                                            touched.itemVariants[index]
                                              .variantSizes[subIndex] &&
                                            touched.itemVariants[index]
                                              .variantSizes[subIndex]
                                              .quantity &&
                                            errors.itemVariants &&
                                            errors.itemVariants[index] &&
                                            errors.itemVariants[index]
                                              .variantSizes &&
                                            errors.itemVariants[index]
                                              .variantSizes[subIndex] &&
                                            errors.itemVariants[index]
                                              .variantSizes[subIndex].quantity
                                        )}
                                        helperText={
                                          touched.itemVariants &&
                                          touched.itemVariants[index] &&
                                          touched.itemVariants[index]
                                            .variantSizes &&
                                          touched.itemVariants[index]
                                            .variantSizes[subIndex] &&
                                          errors.itemVariants &&
                                          errors.itemVariants[index] &&
                                          errors.itemVariants[index]
                                            .variantSizes &&
                                          errors.itemVariants[index]
                                            .variantSizes[subIndex] &&
                                          errors.itemVariants[index]
                                            .variantSizes[subIndex].quantity
                                            ? errors.itemVariants[index]
                                                .variantSizes[subIndex].quantity
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
      {isOpenChartImgDlg && (
        <DropFileContainer
          open={isOpenChartImgDlg}
          onClose={handleOpenCloseChartImgDialog}
          onSave={handleAddSizeChart}
          type="chart"
          color={null}
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
      {isOpenVideoDlg && (
        <VideoUploadDialog
          isOpen={isOpenVideoDlg}
          videoClip={videoClip}
          setVideoClip={setVideoClip}
          handleClose={handleOpenCloseVideoDialog}
        />
      )}
    </Fragment>
  );
};
