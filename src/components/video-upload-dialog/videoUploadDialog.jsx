import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export const VideoUploadDialog = ({
  isOpen,
  handleClose,
  videoClip,
  setVideoClip,
}) => {
  const [preview, setPreview] = React.useState(videoClip);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview({
        file: file,
        url: URL.createObjectURL(file),
        status: "new",
      });
    }
  };

  const handleContinue = () => {
    setVideoClip(preview);
    handleClose();
  };

  const onHandleClose = () => {
    setPreview(null);
    handleClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>Upload Video Clip</DialogTitle>
      <DialogContent>
        <input type="file" accept="video/*" onChange={handleFileChange} />
        {preview && (
          <video
            src={preview?.url}
            controls
            style={{ width: "100%", marginTop: "10px" }}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onHandleClose}>Cancel</Button>
        <Button type="submit" onClick={handleContinue}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
