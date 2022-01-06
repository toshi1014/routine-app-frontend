import React from 'react';
import {
    Button,
    Alert,
    Snackbar,
    TextField,
    MenuItem,
    Menu,
    ListItemText,
    ListItemIcon,
    InputLabel,
    FormControl,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReportIcon from "@mui/icons-material/Report";
import { reportApi } from "../api_handlers/handle";


// TEMP:
const reasonList = ["A", "B", "C", "D", "E", "F", "Other"];
const maxLenReportComment = 140;

type Props ={
    postId: number;
}

function MenuButton(props: Props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const [openReportDialog, setOpenReportDialog] = React.useState(false);
    const handleOpenReportDialog = () => {
        setOpenReportDialog(true);
    }
    const handleCloseReportDialog = () => {
        setOpenReportDialog(false);
        setReportCommentError(false);
        setReportCommentHelperText("");
        handleMenuClose();
    }

    const [reason, setReason] = React.useState(reasonList[0]);
    const handleChangeReason = (event: SelectChangeEvent<string>) => {
        setReason(event.target.value);
    };
    const [reportComment, setReportComment] = React.useState("");
    const [reportCommentError, setReportCommentError] = React.useState(false);
    const [reportCommentHelperText, setReportCommentHelperText] = React.useState("");
    const handleChangeReportComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        const ipt = event.target.value;
        if (ipt.length > maxLenReportComment) {
            setReportCommentError(true);
            setReportCommentHelperText("Max " + maxLenReportComment + " letters. Now, " + ipt.length);
        } else {
            setReportCommentError(false);
            setReportCommentHelperText("");
        }
        setReportComment(ipt);
    }

    const handleClickReport = async () => {
        if (reportComment !== "" && reportComment.length <= maxLenReportComment) {
            handleCloseReportDialog();
            const res = await reportApi(props.postId, reason, reportComment);
            console.log(res);
            setOpenSnackbar(true);
            setAlertMessage("Reported successfully");
        }
    }

    const reportDialogComp = (
        <Dialog
            open={openReportDialog}
            onClose={handleCloseReportDialog}
        >
            <DialogTitle>
                {"Feeling unconfortable?"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    After this confirmation, this contents would be reported anonymously.
                </DialogContentText>

                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                    <InputLabel htmlFor="Reason">Reason</InputLabel>
                    <Select
                        autoFocus
                        value={reason}
                        onChange={handleChangeReason}
                        label="Reason"
                    >
                        {reasonList.map((reason: string, idx: number) => (
                            <MenuItem value={reason} key={idx}>{reason}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    autoFocus
                    margin="dense"
                    label="Component"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeReportComment}
                    error={reportCommentError}
                    helperText={reportCommentHelperText}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseReportDialog}>Cancel</Button>
                <Button onClick={handleClickReport} autoFocus>Report</Button>
            </DialogActions>

        </Dialog>
    );


    // alert
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const handleCloseSnackbar = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackbar(false);
    };
    // end; alert

    return (
        <div>
            <Snackbar
                open={openSnackbar}
                onClose={handleCloseSnackbar}
                sx={{ minWidth: 300 }}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                autoHideDuration={3000}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>

            <IconButton
                aria-expanded={openMenu ? "true" : undefined}
                aria-label="settings"
                onClick={handleMenuClick}
            >
                <MoreVertIcon />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleOpenReportDialog}>
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText>Report</ListItemText>
                </MenuItem>
            </Menu>

            {reportDialogComp}
        </div>
    );
}

export default MenuButton;