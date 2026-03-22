import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { hideToast } from "../../redux/ui/ui-reducer";

const GlobalToast = () => {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((s) => s.ui.toast);

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => dispatch(hideToast())}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert
                onClose={() => dispatch(hideToast())}
                severity={severity}
                variant="filled"
                sx={{ width: "100%", fontWeight: 600, fontSize: "0.82rem" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalToast;
