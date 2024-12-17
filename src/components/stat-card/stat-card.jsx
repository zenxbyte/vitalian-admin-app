import { Box, Card, CardContent, Typography } from "@mui/material";
import CountUp from "react-countup";

export const StatCard = ({ title, icon, data, isLoading }) => {
  return (
    <Card elevation={9} variant={undefined}>
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="left"
            gap={2}
          >
            {icon}
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Typography textAlign="center" variant={isLoading ? "h5" : "h1"}>
            {isLoading ? (
              "Loading..."
            ) : (
              <CountUp start={0} end={data} duration={4} />
            )}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
