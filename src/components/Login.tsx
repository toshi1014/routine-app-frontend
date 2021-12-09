import React from 'react';
import {
    Stack,
    Button,
    Alert,
    Snackbar,
} from "@mui/material";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import LoginSignupBase from "./LoginSignupBase";
import {
    isValidEmail,
    isValidPassword,
} from "../utils/validations";
import {
    ValidationStatus,
} from "../utils/Types";
import { loginApi } from "../api_handlers/handle";


function Login() {
    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);

    const [helperTextEmail, setHelperTextEmail] = React.useState("");
    const [helperTextPassword, setHelperTextPassword] = React.useState("");

    const inputRef = {
        email: {
            value: "",

        },
        password: {
            value: "",
        }
    }

    const isValid = () => {
        const email = inputRef.email.value;
        const password = inputRef.password.value;

        const emailStatus: ValidationStatus = isValidEmail(email);
        const passwordStatus: ValidationStatus = isValidPassword(password);

        setErrorEmail(!emailStatus.boolValid);
        setErrorPassword(!passwordStatus.boolValid);

        setHelperTextEmail(emailStatus.helperText);
        setHelperTextPassword(passwordStatus.helperText);

        return (emailStatus.boolValid && passwordStatus.boolValid);
    };


    const handleLogin = async () => {
        const email = inputRef.email.value;
        const password = inputRef.password.value;

        if ((email !== "") && (password !== "")) {
            const valid = isValid();

            console.log("==========================");
            if (valid) {
                console.log("valid");

                const boolSuccess = await loginApi(email, password);
                if (boolSuccess) {
                    navigate("/mypage_login");
                } else {
                    console.log("login failed");
                    setErrorMessage("login failed");
                    setOpenSnackBar(true);
                }

            } else {
                console.log("invalid");
            }
            console.log("email:", email);
            console.log("password: ", password);
        }
    }


    const elementList = [
        (
            <Button
                color="primary"
                variant="contained"
                onClick={handleLogin}
            >
                Login
                </Button>
        ),
    ];

    const uniqueComp = (
        <Stack direction="row" spacing={1}>
            <p>New to Foo?</p>
            <div>
                <Link
                    to="/signup"
                    style={{
                        textDecoration: "none"
                    }}
                >
                    <Button sx={{ my: 1 }}>Singup!</Button>
                </Link>
            </div>
        </Stack>
    );

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
        <div>
            <Snackbar
                open={openSnackBar}
                onClose={handleCloseSnackBar}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Alert severity="error" onClose={handleCloseSnackBar}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <LoginSignupBase
                header="Login"
                inputRef={inputRef}
                errorEmail={errorEmail}
                helperTextEmail={helperTextEmail}
                errorPassword={errorPassword}
                helperTextPassword={helperTextPassword}
                elementList={elementList}
                uniqueComp={uniqueComp}
            />
        </div>
    );
}

export default Login;