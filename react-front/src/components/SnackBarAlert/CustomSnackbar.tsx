import { AlertTitle, Snackbar } from "@mui/material";
import SnackbarAlert from "./SnackBarAlert";
import useAppStore from "../../store/AppStore";

interface CustomSnackbarProps {
  open: boolean;
  onClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
  message: string;
}

const CustomSnackbar = ({ open, onClose, message }: CustomSnackbarProps) => {

  const darkMode = useAppStore(s => s.darkMode);

  return (
    <>
      {darkMode && <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarAlert
          onClose={onClose}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#37b24d', color: '#fff' }}>
          <AlertTitle>Success</AlertTitle>
          {message}
        </SnackbarAlert>
      </Snackbar>}
      {!darkMode && <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarAlert
          onClose={onClose}
          severity="success"
          sx={{ width: '100%', backgroundColor: '#37b24d', color: '#fff' }}>
          <AlertTitle>Success</AlertTitle>
          {message}
        </SnackbarAlert>
      </Snackbar>}
    </>
  );
}

export default CustomSnackbar;