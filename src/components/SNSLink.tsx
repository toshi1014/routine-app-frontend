import React from 'react';
import {
    Button,
    IconButton,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    InputAdornment,
    Input,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SupportedSNSMedium } from "../utils/Types";
import { updateUserInfoApi } from "../api_handlers/handle";


type Props = {
    medium: SupportedSNSMedium;
    editable: boolean;
    link: string;
}

function SNSLink(props: Props) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const [strLink, setStrLink] = React.useState("");

    const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ipt = event.target.value;
        setStrLink(ipt);
    }
    const handleClickClear = () => {
        setStrLink("");
    }

    const handleClickRedirect = () => {
        let url: string;
        if (props.editable) {
            url = strLink;
        } else {
            url = props.link;
        }
        window.open(url, "_blank");
    }

    const handleClickEnter = async () => {
        const res = await updateUserInfoApi(props.medium, strLink);
        if (!res.status) {
            throw new Error;
        }
        handleCloseDialog();
    }

    const [SNSIcon, setSNSIcon] = React.useState<React.ReactElement>();

    const dialogComp = (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
        >
            <DialogTitle>
                {(props.editable
                    ? `Enter your ${props.medium} URL`
                    : "Redirect to this link"
                )}
            </DialogTitle>

            <DialogContent>
                {(
                    props.editable
                        ?
                        <Input
                            autoFocus
                            fullWidth
                            margin="dense"
                            value={strLink}
                            onChange={handleChangeInput}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickClear}
                                    >
                                        <ClearIcon sx={{ fontSize: 15 }} />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        : <DialogContentText>
                            This URL is NOT authenticated.
                        </DialogContentText>
                )}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
                    onClick={handleClickRedirect}
                    disabled={props.editable && strLink === ""}
                >
                    Redirect
                </Button>
                {(props.editable
                    ? <Button onClick={handleClickEnter}>Enter</Button>
                    : <div />
                )}
            </DialogActions>
        </Dialog>
    );

    React.useEffect(() => {
        if (props.medium === "Facebook") setSNSIcon(<FacebookIcon />);
        else if (props.medium === "Twitter") setSNSIcon(<TwitterIcon />);
        else if (props.medium === "Instagram") setSNSIcon(<InstagramIcon />);
        setStrLink(props.link);
    }, [props.link]);

    return (
        <div>
            {dialogComp}

            <IconButton
                onClick={handleOpenDialog}
                disabled={(!props.editable) && (props.link === "" || props.link === null)}
            >
                {SNSIcon}
            </IconButton>
        </div>
    );
}

export default SNSLink;