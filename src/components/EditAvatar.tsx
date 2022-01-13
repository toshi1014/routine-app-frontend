import React from 'react';
import {
    Grid,
    Button,
    Stack,
} from "@mui/material";
import Cropper from "react-easy-crop";
import { uploadDataURLImage } from "../firebase/handler";

type CroppedArea = {
    x: number;
    y: number;
    width: number;
    height: number;
}

type Props = {
    // TEMP: any type
    userId: number;
    filesContent: Array<any>;
    clear: () => void;
}

function EditAvatar(props: Props) {
    const CROP_SIZE = 300;

    const [imageCrop, setImageCrop] = React.useState({ x: 0, y: 0 });
    const [imageZoom, setImageZoom] = React.useState(1);

    const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<CroppedArea>();

    const getCroppedImage = (
        imageBase64: string,
        croppedAreaPixels: CroppedArea,
    ) => {
        const sizeOut = croppedAreaPixels.width;

        const canvas: HTMLCanvasElement = document.createElement("canvas");
        canvas.width = sizeOut;
        canvas.height = sizeOut;

        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error;

        const img = new Image();

        img.src = imageBase64;
        ctx.drawImage(
            img,
            croppedAreaPixels.x,    // sx
            croppedAreaPixels.y,    // sy
            sizeOut,                // sWidth
            sizeOut,                // sHeight
            0,                      // dx
            0,                      // dy
            sizeOut,                // dWidth
            sizeOut,                // dHeight
        );

        return canvas.toDataURL();
    }

    const onCropComplete = React.useCallback((
        _: CroppedArea, croppedAreaPixels: CroppedArea
    ) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const handleClickUpload = async () => {
        if (croppedAreaPixels) {
            const croppedImage = getCroppedImage(
                props.filesContent[0].content,
                croppedAreaPixels,
            );
            await uploadDataURLImage(croppedImage, "avatar-" + props.userId);
            props.clear();
        }
    }

    return (
        <Grid container direction="column">
            <Grid item>
                {props.filesContent.map((file, idx) => (
                    <Cropper
                        key={idx}
                        image={file.content}
                        crop={imageCrop}
                        cropShape="round"
                        aspect={1}
                        zoom={imageZoom}
                        onCropChange={setImageCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setImageZoom}
                        objectFit="contain"
                        cropSize={{
                            width: CROP_SIZE,
                            height: CROP_SIZE,
                        }}
                        onMediaLoaded={(mediaSize) => {
                            console.log(mediaSize);
                            setImageZoom(CROP_SIZE / mediaSize.height)
                        }}
                    />
                ))}
            </Grid>

            <Grid item sx={{ mt: 50 }}>
                <Stack direction="row" spacing={3} justifyContent="center">
                    <Button
                        color="secondary"
                        variant="outlined"
                        onClick={props.clear}
                    >
                        Canel
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={handleClickUpload}
                    >
                        Upload
                    </Button>
                </Stack>
            </Grid>

        </Grid>
    );
}

export default EditAvatar;