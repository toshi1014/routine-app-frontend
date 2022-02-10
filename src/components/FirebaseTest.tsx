import React from 'react';
import {
    uploadImage,
    downloadImageURL,
} from "../firebase/handler";
import ImageIcon from "@mui/icons-material/Image";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import ErrorIcon from "@mui/icons-material/Error";

function FirebaseTest() {
    const [image, setImage] = React.useState<File>();
    const [imageURL, setImageURL] = React.useState("");
    const handleSelectImage = (event: any) => {
        setImage(event.target.files[0]);
    }

    const handleUpload = async () => {
        if (image) {
            const filename = "logo2.png";
            setImageURL(await uploadImage(image, filename));
        } else {
            console.log("else");
        }
    }

    const handleDownload = async () => {
        const filename = "logo2.png";
        const imageURL = await downloadImageURL(filename);
        setImageURL(imageURL);
    }

    return (
        <div>
            <h1>FirebaseTest</h1>
            <input type="file" onChange={handleSelectImage} /><br />
            <button onClick={handleUpload}>Upload</button><br />
            <button onClick={handleDownload}>Download</button><br />
            {(imageURL === ""
                ? <ImageIcon />
                : (imageURL === "broken"
                    ? <ImageNotSupportedIcon />
                    : (imageURL === "failed"
                        ? <ErrorIcon />
                        : <img src={imageURL} />
                    )
                )
            )}
        </div>
    )
}

export default FirebaseTest;