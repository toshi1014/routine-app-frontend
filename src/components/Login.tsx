import React from 'react';
import {
    TextField,
    Stack,
    Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import {
    Link,
} from "react-router-dom";
import LoginSignupBase from "./LoginSignupBase";
import {
    isValidEmail,
    isValidPassword,
} from "../utils/validations";
import {
    EmailStatus,
    PasswordStatus,
} from "../utils/Types";


function Login() {
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

        const emailStatus: EmailStatus= isValidEmail(email);
        const passwordStatus:PasswordStatus = isValidPassword(password);

        setErrorEmail(!emailStatus.boolValidEmail);
        setErrorPassword(!passwordStatus.boolValidPassword);

        setHelperTextEmail(emailStatus.helperTextEmail);
        setHelperTextPassword(passwordStatus.helperTextPassword);

        return (emailStatus.boolValidEmail && passwordStatus.boolValidPassword);
    };


    const handleLogin = () => {
        if ((inputRef.email.value !== "") && (inputRef.password.value !== "")) {
            const valid = isValid();

            console.log("==========================");
            if (valid) {
                console.log("valid");
            } else {
                console.log("invalid");
            }
            console.log(inputRef.email.value);
            console.log(inputRef.password.value);
        }
    }


    const elementList = [
        (
            <div>
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
                    error={errorEmail}
                    helperText={helperTextEmail}
                    inputRef={ref => { inputRef.email = ref; }}
                />
            </div>
        ),
        (
            <div>
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
                    error={errorPassword}
                    helperText={helperTextPassword}
                    inputRef={ref => { inputRef.password = ref; }}
                />
            </div>
        ),
        (
            <div>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </div>
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

    return (
        <LoginSignupBase header="Login" elementList={elementList} uniqueComp={uniqueComp} />
    );
}

export default Login;