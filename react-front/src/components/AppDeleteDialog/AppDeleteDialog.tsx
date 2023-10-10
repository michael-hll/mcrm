import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import AppButton from "../AppButton/AppButton";

interface AppDeleteDialogProps<T> {
  open: boolean;
  handleConfim: (args: T) => void;
  handleClose: () => void;
  args: T;
  message: string;
}

function AppDeleteDialog<T>(props: AppDeleteDialogProps<T>) {

  return (
    <Dialog
      open={props.open}
      onClose={() => { }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <AppButton onClick={() => { props.handleClose() }}>Close</AppButton>
        <AppButton onClick={() => { props.handleConfim(props.args) }} autoFocus>
          Delete
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

export default AppDeleteDialog;