import React from 'react';
import {
    TextField,
    Paper,
    Stack,
    Button,
    CardContent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CheckIcon from "@mui/icons-material/Check";
import LoginSignupBase from "./LoginSignupBase";
import PasswordIcon from "@mui/icons-material/Password";
import {
    useNavigate,
} from "react-router-dom";
import {
    isValidEmail,
    isValidPassword,
    isValidUsername,
} from "../utils/validations";
import {
    ValidationStatus,
    AuthEmail,
} from "../utils/Types";
import {
    generateAuthCode,
} from "../utils/utils";
import {
    signupApi,
    sendEmailApi,
} from "../api_handlers/handle";


function Signup() {
    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [errorUsername, setErrorUsername] = React.useState(false);
    const [errorAuthCode, setErrorAuthCode] = React.useState(false);

    const [helperTextEmail, setHelperTextEmail] = React.useState("");
    const [helperTextPassword, setHelperTextPassword] = React.useState("");
    const [helperTextUsername, setHelperTextUsername] = React.useState("");

    const authCode = generateAuthCode(5);

    let inputRef = {
        email: {
            value: "",
        },
        password: {
            value: "",
        },
        username: {
            value: "",
        },
    }

    const isValid = async () => {
        const email = inputRef.email.value;
        const password = inputRef.password.value;
        const username = inputRef.username.value;

        const emailStatus: ValidationStatus = await isValidEmail(email, true);
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

    const handleSendEmail = async () => {
        // XXX: become null afterward
        const email = inputRef.email.value;
        const password = inputRef.password.value;
        const username = inputRef.username.value;
        // end; XXX

        const valid = await isValid();

        setBoolValidInput(valid);

        if (valid) {
            setAuthCodeComp(authCodeCompBase);
            // TODO: send email

            const req: AuthEmail = {
                emailAddress: email,
                purpose: "auth",
                context: {
                    username: username,
                    authCode: authCode,
                }
            }
            const res = await sendEmailApi(req);
            console.log("authCode:", authCode)
        }

        console.log("==========================");
        console.log(email, password, username);

        // XXX: fix nulled properties
        inputRef = {
            email: {
                value: email,
            },
            password: {
                value: password,
            },
            username: {
                value: username,
            },
        }
    }

    const elementList = [
        (
            <Stack direction="row" spacing={2} alignItems="center">
                <BorderColorIcon sx={{ fontSize: 40 }} />
                <TextField
                    variant="outlined"
                    label="Username"
                    disabled={boolValidInput}
                    error={errorUsername}
                    helperText={helperTextUsername}
                    inputRef={ref => { inputRef.username = ref; }}
                />
            </Stack>
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

    const handleChangeAuthCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === authCode) {
            callSignupApi();
        } else if (event.target.value.length >= authCode.length) {
            setErrorMessage("bad code");
            setOpenSnackBar(true);
        }
    }

    const callSignupApi = async () => {
        const boolSuccess: boolean = await signupApi(
            inputRef.email.value,
            inputRef.password.value,
            inputRef.username.value,
        );

        if (boolSuccess) {
            navigate("/mypage_login");
        } else {
            setErrorMessage("signup error");
            setOpenSnackBar(true);
        }
    }

    const [authCodeComp, setAuthCodeComp] = React.useState<React.ReactElement>();
    const authCodeCompBase = (
        <Paper variant="outlined" sx={{ maxWidth: 450 }}>
            <CardContent sx={{ my: 1 }}>
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <PasswordIcon sx={{ fontSize: 40 }} />
                    <TextField
                        variant="outlined"
                        label="Code"
                        error={errorAuthCode}
                        onChange={handleChangeAuthCode}
                    />
                </Stack>
            </CardContent>
        </Paper>
    )

    // error snackbar
    const [errorMessage, setErrorMessage] = React.useState("");
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const handleCloseSnackBar = (
        event?: React.SyntheticEvent,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackBar(false);
    };
    // end; error snackbar


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
            disableTextField={boolValidInput}

            openSnackBar={openSnackBar}
            handleCloseSnackBar={handleCloseSnackBar}
            errorMessage={errorMessage}
        />
    );
}

export default Signup;