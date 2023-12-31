import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";

function LinearProgressWithLabel(props: {
  sx: { width: string; backgroundColor: string };
  value: number;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", width: props.sx.width }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" value={props.value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="white">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;
