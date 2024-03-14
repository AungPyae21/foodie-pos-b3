import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hideSnackBar } from "../store/slices/AppSnackBarSlice";
import { useEffect } from "react";

const AppSnackBar = () => {
  const { message, open, type } = useAppSelector((state) => state.snackBar);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideSnackBar());
    }, 3000);
  }, [message]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      onClose={() => {}}
    >
      <Alert
        onClose={() => dispatch(hideSnackBar())}
        variant="filled"
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default AppSnackBar;
