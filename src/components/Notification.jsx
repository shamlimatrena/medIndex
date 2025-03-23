import { Alert, Snackbar } from "@mui/material";

const Notification = ({ snackbar, handleCloseSnackbar }) => {
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
