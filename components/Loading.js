"use client";

import { Box, LoadingOverlay } from "@mantine/core";

export const Loading = () => {
  return (
    <Box>
      <LoadingOverlay
        visible
        zIndex={1000}
        loaderProps={{ size: "lg", type: "bars", color: "primary.5" }}
        overlayProps={{ radius: "0", blur: 100, c: "dark.9" }}></LoadingOverlay>
    </Box>
  );
};
