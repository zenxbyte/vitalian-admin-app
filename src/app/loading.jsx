import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={4}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: "100%",
        minHeight: "100%",
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="h6">Loading..</Typography>
    </Box>
  );
};

export default Loading;
