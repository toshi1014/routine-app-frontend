import React from 'react';
import {
    Paper,
    TextField,
    Grid,
    Typography,
    Container,
    Alert,
    Stack,
    Snackbar,
    CardContent,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";


type InputRef = {
    email: {
        value: string;
    };
    password: {
        value: string;
    }
}

type Props = {
    header: string;
    inputRef: InputRef;
    errorEmail: boolean;
    helperTextEmail: string;
    errorPassword: boolean;
    helperTextPassword: string;
    elementList: Array<React.ReactElement>;
    disableTextField?: boolean;
    uniqueComp?: React.ReactElement;

    openSnackBar: boolean;
    handleCloseSnackBar: () => void;
    errorMessage: string;
}


function LoginSignupBase(props: Props) {
    const emailComp = (
        <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
                <AccountCircleIcon sx={{ fontSize: 40 }}/>
                <TextField
                    variant="outlined"
                    label="Email Address"
                    disabled={props.disableTextField}
                    error={props.errorEmail}
                    helperText={props.helperTextEmail}
                    inputRef={ref => { props.inputRef.email = ref; }}
                />
            </Stack>
        </Grid>
    );

    const passwordComp = (
        <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
                <KeyIcon sx={{ fontSize: 40 }}/>
                <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    disabled={props.disableTextField}
                    error={props.errorPassword}
                    helperText={props.helperTextPassword}
                    inputRef={ref => { props.inputRef.password = ref; }}
                />
            </Stack>
        </Grid>
    );


    return (
        <div>
            <Snackbar
                open={props.openSnackBar}
                onClose={props.handleCloseSnackBar}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert severity="error" onClose={props.handleCloseSnackBar}>
                    {props.errorMessage}
                </Alert>
            </Snackbar>

            <Container maxWidth="sm">
                <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>{props.header}</Typography>
                <Paper variant="outlined" sx={{ maxWidth: 450 }}>
                    <CardContent sx={{ my: 3 }}>
                        <Grid
                            container
                            direction="column"
                            spacing={2}
                            justifyContent="center"
                            alignItems="center"
                        >
                            {emailComp}
                            {passwordComp}

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
        </div>
    );
}

export default LoginSignupBase;