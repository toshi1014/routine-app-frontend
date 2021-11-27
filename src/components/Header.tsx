import {
} from "@mui/material";
import {
    Link,
} from "react-router-dom";
import ApplicationBar from "./ApplicationBar";


// <h1>Header</h1>
//     <ul>
//         <li><Link to="/">Top</Link></li>
//         <li><Link to="/routine_contents">RoutineContents</Link></li>
//     </ul>
function Header() {
    return (
        <div>
            <ApplicationBar />

        </div>
    );
}

export default Header;