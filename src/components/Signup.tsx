import React from 'react';
import {
    TextField,
    Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import SendIcon from "@mui/icons-material/Send";
import LoginSignupBase from "./LoginSignupBase";
import {
    isValidEmail,
    isValidPassword,
} from "../utils/validations";
import {
    EmailStatus,
    PasswordStatus,
} from "../utils/Types";


function Signup() {
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
                    onClick={handleSendEmail}
                    endIcon={<SendIcon />}
                >
                    Send Email
                </Button>
            </div>
        ),
    ];

    return (
        <LoginSignupBase header="Signup" elementList={elementList} />
    );
}

export default Signup;