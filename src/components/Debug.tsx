import React from 'react';
import { getApi, postApi, putApi } from "../api_handlers/handle";


function Debug() {
    const [username, setUsername] = React.useState("John Doe");
    const handleName = (event: any) => {
        setUsername(event.target.value);
    }

    const getMethod = async () => {
        const val = await getApi();
        console.log(val);
    }

    const postMethod = async () => {
        const val = await postApi(username);
        console.log(val);
    }

    const updateMethod = async () => {
        const val = await putApi(username);
        console.log(val);
    }

    const showToken = () => {
        console.log(localStorage.getItem("token"));
    }

    return (
        <div>
            <h1>Debug</h1>
            <div><button onClick={getMethod}>GET</button></div>
            <div>
                <input type="text" onChange={handleName} />
                <button onClick={postMethod}>POST</button>
            </div>
            <div><button onClick={updateMethod}>UPDATE</button></div>
            <div><button onClick={showToken}>SHOW_TOKEN</button></div>
        </div>
    );
}

export default Debug;