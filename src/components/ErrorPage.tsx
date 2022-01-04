import React from 'react';
import {
    Grid,
    CardContent,
    Typography,
    Stack,
    Paper,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Props = {
    errorMessage: string;
}

function ErrorPage(props: Props) {
    const iconSize = 50;

    return (
        <Grid container direction="column">
            <Paper sx={{ my: 1 }}>
                <Grid item>
                    <CardContent>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="flex-start"
                        >
                            <ErrorOutlineIcon sx={{ width: iconSize, height: iconSize }} />
                            <Typography variant="h3">Oops!</Typography>
                        </Stack>
                    </CardContent>
                </Grid>

                <Grid item>
                    <CardContent>
                        <Typography variant="h5">{props.errorMessage}</Typography>
                    </CardContent>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default ErrorPage;