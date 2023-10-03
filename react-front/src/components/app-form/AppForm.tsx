import { Box, Grid } from "@mui/material";
import React, { FormHTMLAttributes, ReactNode } from "react";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const AppForm: React.FC<Props> = ({ children, ...resOfProps }) => {
  return (
    <form {...resOfProps}>
      <Grid container direction="column" alignItems="center">
        <Box maxWidth="40rem" width="100%">
          {children}
        </Box>
      </Grid>
    </form>
  );
};

export default AppForm;