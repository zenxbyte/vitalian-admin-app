import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineSeparator,
} from "@mui/lab";
import { Box, Card, CardContent, Typography } from "@mui/material";

export const RecentPickUpOrders = ({ data, isLoading }) => {
  return (
    <Card sx={{ padding: 0 }} elevation={9} variant={undefined}>
      <CardContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h6">Recent Pickup Requests</Typography>
          {isLoading && <Typography textAlign="center">Loading...</Typography>}
          {!isLoading && data.length === 0 && (
            <Typography textAlign="center">Data not found</Typography>
          )}
          {!isLoading && data.length > 0 && (
            <Timeline
              className="theme-timeline"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              sx={{
                p: 0,
                //mb: "-40px",
                "& .MuiTimelineConnector-root": {
                  width: "1px",
                  backgroundColor: "#efefef",
                },
                [`& .${timelineOppositeContentClasses.root}`]: {
                  flex: 0.5,
                  paddingLeft: 0,
                },
              }}
            >
              {data.map((item, key) => (
                <TimelineItem key={key}>
                  <TimelineOppositeContent>
                    {item.createdAt}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="primary" variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography>{`${item.qty} Orders`}</Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
