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
        <Typography paragraph>
            <Grid
                container
                wrap="nowrap"
                spacing={2}
                sx={{ maxWidth: props.maxWidth }}
            >
                <Grid item xs zeroMinWidth>
                    <Typography noWrap>{props.text}</Typography>
                </Grid>
            </Grid >
        </Typography>
    );
}

export default TextWithLimitation;