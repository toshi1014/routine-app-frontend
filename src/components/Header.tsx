import {
} from "@mui/material";
import {
    Link,
} from "react-router-dom";
import ApplicationBar from "./ApplicationBar";

// TEMP:
const boolLoginStatus = true;

function Header() {
    return (
        <div>
            <ApplicationBar />
        </div>
    );
}

export default Header;