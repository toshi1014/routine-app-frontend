import React from 'react';
import {
    Stack,
    Button,
    Typography,
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
import { ValidationStatus } from "../utils/Types";
import { loginApi } from "../api_handlers/handle";
import { downloadImageURL } from "../firebase/handler";
import { decodeJwt } from "../utils/utils";


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

    const isValid = async () => {
        const email = inputRef.email.value;
        const password = inputRef.password.value;

        const emailStatus: ValidationStatus = await isValidEmail(email, false);
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
            const valid = await isValid();

            console.log("==========================");
            if (valid) {
                console.log("valid");

                const boolSuccess = await loginApi(email, password);
                if (boolSuccess) {
                    // store my avatar
                    const token = localStorage.getItem("token")
                    const myId = (token === null) ? null : decodeJwt(token).id;
                    const imageURL = await downloadImageURL("avatar-" + myId);
                    localStorage.setItem("myAvatar", imageURL);

                    navigate("/mypage_login");
                    window.location.reload();
                } else {
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
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body1">New to Foo?</Typography>

            <Link
                to="/signup"
                style={{
                    textDecoration: "none"
                }}
            >
                <Button sx={{ my: 1 }}>Singup!</Button>
            </Link>
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
        <LoginSignupBase
            header="Login"
            inputRef={inputRef}
            errorEmail={errorEmail}
            helperTextEmail={helperTextEmail}
            errorPassword={errorPassword}
            helperTextPassword={helperTextPassword}
            elementList={elementList}
            uniqueComp={uniqueComp}

            openSnackBar={openSnackBar}
            handleCloseSnackBar={handleCloseSnackBar}
            errorMessage={errorMessage}
        />
    );
}

export default Login;