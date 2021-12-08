import React from 'react';
import axios from "axios";


const url = "http://localhost:8000/debug";

function Debug() {
    const [name, setName] = React.useState("John Doe");
    const handleName = (event: any) => {
        setName(event.target.value);
    }

    const getMethod = async () => {
        try {
            const res = await axios.get(url);
            console.log(...res.data);
        } catch (err) {
            console.log("Err");
            console.log(err);
        }
    }

    const postMethod = async () => {
        try {
            const res = await axios.post(
                url,
                {
                    "name": name
                });
            console.log(...res.data);
        } catch (err){
            console.log("Err");
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Debug</h1>
            <div><button onClick={getMethod}>GET</button></div>
            <div>
                <input type="text" onChange={handleName} />
                <button onClick={postMethod}>POST</button>
            </div>
        </div>
    );
}

export default Debug;