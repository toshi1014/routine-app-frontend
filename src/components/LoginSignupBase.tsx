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


type InputRef = {
    email: {
        value: string;
    };
    password: {
        value:string;
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
    uniqueComp?: React.ReactElement;
}


function LoginSignupBase(props: Props) {
    const emailComp = (
        <Grid item>
            <AccountCircleIcon
                sx={{
                    fontSize: 45,
                    mx: 2,
                    my: 0.5,
                }}
            />
            <TextField
                variant="outlined"
                label="Email Address"
                error={props.errorEmail}
                helperText={props.helperTextEmail}
                inputRef={ref => { props.inputRef.email = ref; }}
            />
        </Grid>
    );

    const passwordComp = (
        <Grid item>
            <KeyIcon
                sx={{
                    fontSize: 45,
                    mx: 2,
                    my: 0.5,
                }}
            />
            <TextField
                variant="outlined"
                label="Password"
                type="password"
                error={props.errorPassword}
                helperText={props.helperTextPassword}
                inputRef={ref => { props.inputRef.password = ref; }}
            />
        </Grid>
    );

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
    );
}

export default LoginSignupBase;