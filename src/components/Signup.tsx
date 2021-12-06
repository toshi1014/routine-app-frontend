import React from 'react';
import {
    TextField,
    Paper,
    Button,
    Grid,
    CardContent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import LoginSignupBase from "./LoginSignupBase";
import PasswordIcon from "@mui/icons-material/Password";
import {
    isValidEmail,
    isValidPassword,
    isValidUsername,
} from "../utils/validations";
import {
    ValidationStatus,
} from "../utils/Types";


function Signup() {
    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [errorUsername, setErrorUsername] = React.useState(false);
    const [errorAuthCode, setErrorAuthCode] = React.useState(false);

    const [helperTextEmail, setHelperTextEmail] = React.useState("");
    const [helperTextPassword, setHelperTextPassword] = React.useState("");
    const [helperTextUsername, setHelperTextUsername] = React.useState("");
    const [helperTextAuthCode, setHelperTextAuthCode] = React.useState("");

    const inputRef = {
        email: {
            value: "",
        },
        password: {
            value: "",
        },
        username: {
            value: "",
        },
        authCode: {
            value: "",
        },
    }

    const isValid = () => {
        const email = inputRef.email.value;
        const password = inputRef.password.value;
        const username = inputRef.username.value;

        const emailStatus: ValidationStatus = isValidEmail(email);
        const passwordStatus: ValidationStatus = isValidPassword(password);
        const usernameStatus: ValidationStatus = isValidUsername(username);

        setErrorEmail(!emailStatus.boolValid);
        setErrorPassword(!passwordStatus.boolValid);
        setErrorUsername(!usernameStatus.boolValid);

        setHelperTextEmail(emailStatus.helperText);
        setHelperTextPassword(passwordStatus.helperText);
        setHelperTextUsername(usernameStatus.helperText);

        console.log(emailStatus.boolValid && passwordStatus.boolValid && usernameStatus.boolValid);
        return (emailStatus.boolValid && passwordStatus.boolValid && usernameStatus.boolValid);
    };

    const [boolValidInput, setBoolValidInput] = React.useState(false);

    const handleSendEmail = () => {
        const valid = isValid();

        setBoolValidInput(valid);

        if (valid) {
            setAuthCodeComp(authCodeCompBase);
        }

        console.log("==========================");
        console.log(inputRef.email.value);
        console.log(inputRef.password.value);
        console.log(inputRef.username.value);
    }

    const elementList = [
        (
            <div>
                <BorderColorIcon
                    sx={{
                        fontSize: 40,
                        mx: 2,
                        my: 0.5,
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Username"
                    error={errorUsername}
                    helperText={helperTextUsername}
                    inputRef={ref => { inputRef.username = ref; }}
                />
            </div>
        ),
        (
            <Button
                color="primary"
                variant="contained"
                onClick={handleSendEmail}
                endIcon={boolValidInput ? <CheckIcon /> : <SendIcon />}
                disabled={boolValidInput}
            >
                Send Email
            </Button>
        ),
    ];

    const handleAuthCode = () => {
        console.log("handleAuthCode");
        console.log(inputRef.authCode.value);
    }

    const [authCodeComp, setAuthCodeComp] = React.useState<React.ReactElement>();
    const authCodeCompBase = (
        <Paper variant="outlined" sx={{ width: 450 }}>
            <CardContent sx={{ my: 1 }}>
                <Grid
                    container
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <PasswordIcon
                            sx={{
                                fontSize: 40,
                                mx: 2,
                                my: 0.5,
                            }}
                        />
                        <TextField
                            variant="outlined"
                            label="Code"
                            error={errorAuthCode}
                            helperText={helperTextAuthCode}
                            inputRef={ref => { inputRef.authCode = ref; }}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleAuthCode}
                        >
                            Create Account
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Paper>
    )


    return (
        <LoginSignupBase
            header="Signup"
            inputRef={inputRef}
            errorEmail={errorEmail}
            helperTextEmail={helperTextEmail}
            errorPassword={errorPassword}
            helperTextPassword={helperTextPassword}
            elementList={elementList}
            uniqueComp={authCodeComp}
        />
    );
}

export default Signup;