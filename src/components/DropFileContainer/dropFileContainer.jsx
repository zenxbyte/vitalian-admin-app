import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Slider,
  Box,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Cropper from "react-easy-crop";

import cropImageUtil from "../../utils/cropImageUtil.js";
import commonUtil from "@/utils/common-util.js";

const DropFileContainer = ({ open, onClose, onSave, color, type = "item" }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState("");
  const [originalFileType, setOriginalFileType] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Handles image file upload
  const handleFileChange = (event) => {
    const file =
      type === "item"
        ? commonUtil.createImgFileName(color, event.target.files[0])
        : event.target.files[0];

    setFileName(file.name);

    const originalFileType = file.type || "image/jpeg";
    setOriginalFileType(originalFileType);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const croppedImage = await cropImageUtil(
        imageSrc,
        croppedAreaPixels,
        fileName,
        originalFileType
      );

      //const imgeUrl = URL.createObjectURL(croppedImage);
      onSave({
        file: croppedImage,
        fileUrl: URL.createObjectURL(croppedImage),
        color: color,
        status: "new",
      });
      onClose();
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, onSave, onClose]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Upload and Crop Image</DialogTitle>
      <DialogContent>
        {!imageSrc ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCamera />}
            >
              {type === "item" ? "Upload Image" : "Upload Size Chart"}
              <input
                type="file"
                hidden
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        ) : (
          <>
            <Box style={{ position: "relative", width: "100%", height: 400 }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={type === "item" ? 3 / 4 : 4 / 3} // Aspect ratio 3:4 is item image, chart image 4 / 3
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </Box>
            <Box style={{ marginTop: 16 }}>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, zoom) => setZoom(zoom)}
                aria-labelledby="zoom-slider"
              />
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {imageSrc && (
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DropFileContainer;
