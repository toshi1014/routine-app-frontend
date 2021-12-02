import React from 'react';
import {
    Paper,
    TextField,
    Grid,
    Typography,
    Container,
    Stack,
    Button,
    CardContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import CheckIcon from '@mui/icons-material/Check';


type Props = {
    header: string;
    elementList: Array<React.ReactElement>;
    uniqueComp?: React.ReactElement;
}


function LoginSignupBase(props: Props) {
    return (
        <Container maxWidth="sm">
            <h1>{props.header}</h1>
            <Paper variant="outlined" sx={{ width: 450 }}>
                <CardContent sx={{ my: 3 }}>
                    <Grid
                        container
                        direction="column"
                        spacing={2}
                        justifyContent="center"
                        alignItems="center"
                    >

                        {props.elementList.map((element: React.ReactElement, idx: number) =>
                            <Grid item key={idx}>
                                {element}
                            </Grid>
                        )}

                    </Grid>
                </CardContent>
            </Paper>

            {props.uniqueComp}

        </Container>
    );
}

export default LoginSignupBase;