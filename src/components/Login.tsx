import React from 'react';
import {
    Stack,
    Button,
} from "@mui/material";
import {
    Link,
} from "react-router-dom";
import LoginSignupBase from "./LoginSignupBase";
import {
    isValidEmail,
    isValidPassword,
} from "../utils/validations";
import {
    ValidationStatus,
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

        const emailStatus: ValidationStatus = isValidEmail(email);
        const passwordStatus: ValidationStatus = isValidPassword(password);

        setErrorEmail(!emailStatus.boolValid);
        setErrorPassword(!passwordStatus.boolValid);

        setHelperTextEmail(emailStatus.helperText);
        setHelperTextPassword(passwordStatus.helperText);

        return (emailStatus.boolValid && passwordStatus.boolValid);
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
        />
    );
}

export default Login;