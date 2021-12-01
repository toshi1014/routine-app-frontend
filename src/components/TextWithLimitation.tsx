import React from 'react';
import {
    Grid,
    Typography,
} from "@mui/material";


type Props = {
    maxWidth: number;
    text: string;
}

function TextWithLimitation(props: Props) {
    return (
        <Grid
            container
            wrap="nowrap"
            spacing={2}
            sx={{ maxWidth: props.maxWidth }}
        >
            <Grid item xs zeroMinWidth>

                <Typography noWrap variant="body2" color="text.secondary">
                    {props.text}
                </Typography>
            </Grid>
        </Grid >
    );
}

export default TextWithLimitation;