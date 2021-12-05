import React from 'react';
import {
    TextField,
    Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LoginSignupBase from "./LoginSignupBase";
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

    const [helperTextEmail, setHelperTextEmail] = React.useState("");
    const [helperTextPassword, setHelperTextPassword] = React.useState("");
    const [helperTextUsername, setHelperTextUsername] = React.useState("");


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

        return (emailStatus.boolValid && passwordStatus.boolValid && usernameStatus.boolValid);
    };

    const handleSendEmail = () => {
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
            console.log(inputRef.username.value);
        }
    }

    const elementList = [
        (
            <div>
                <BorderColorIcon
                    sx={{
                        fontSize: 45,
                        mx: 2,
                        my: 0.5,
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Username"
                    error={errorUsername}
                    helperText={helperTextUsername}
                    inputRef={ref => {inputRef.username = ref; }}
                />
            </div>
        ),
        (
            <Button
                color="primary"
                variant="contained"
                onClick={handleSendEmail}
                endIcon={<SendIcon />}
            >
                Send Email
            </Button>
        ),
    ];


    return (
        <LoginSignupBase
            header="Signup"
            inputRef={inputRef}
            errorEmail={errorEmail}
            helperTextEmail={helperTextEmail}
            errorPassword={errorPassword}
            helperTextPassword={helperTextPassword}
            elementList={elementList}
        />
    );
}

export default Signup;