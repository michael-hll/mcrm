import { Stack } from "@mui/material"
import React, { PropsWithChildren } from "react"

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack>
      {children}
    </Stack>
  );
};

export default DefaultLayout;