import { Box, Grid, Snackbar } from "@mui/material";
import React, { FormHTMLAttributes, ReactNode } from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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