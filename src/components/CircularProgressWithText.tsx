import React from 'react';
import {
    CircularProgress,
    Backdrop,
} from "@mui/material";

type Props = {
    open: boolean;
    whatURwating4: string;
}

function CircularProgressWithText(props: Props) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <CircularProgress color="inherit" />
            <h2>{props.whatURwating4}</h2>
        </Backdrop>
    );
}

export default CircularProgressWithText;