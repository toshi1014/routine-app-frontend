import React from 'react';
import {
    Card,
    Grid,
    Snackbar,
    Alert,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    CardHeader,
    CardMedia,
    Button,
    CardContent,
    MenuItem,
    Menu,
    ListItemText,
    ListItemIcon,
    CardActions,
    Typography,
    Collapse,
    InputLabel,
    FormControl,
} from "@mui/material";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
    styled,
} from "@mui/material/styles";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReportIcon from "@mui/icons-material/Report";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
    Link,
    useNavigate,
} from "react-router-dom";
import TextWithLimitation from "./TextWithLimitation";
import UserAvatar from "./UserAvatar";
import { RoutinePackContents } from "../utils/Types";
import { decodeJwt } from "../utils/utils";
import {
    likeApi,
    favoriteApi,
    reportApi,
} from "../api_handlers/handle";


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


// TEMP:
const reasonList = ["A", "B", "C", "D", "E", "F", "Other"];
const maxLenReportComment = 140;

const token = localStorage.getItem("token")
const boolLoginStatus = (token === null) ? false : true;
const userId = (token === null) ? null : decodeJwt(token).id;

type Props = RoutinePackContents & {
    editable?: boolean;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
}

function RoutinePack(props: Props) {
    const packWidth = 345;
    const navigate = useNavigate();

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandMoreClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    // like
    const [myLikeCnt, setMyLikeCnt] = React.useState(0);

    const [likeList, setLikeList] = React.useState<Array<number>>(
        boolLoginStatus && token
            ? decodeJwt(token).likeList
            : []
    );

    const updateLikeList = (token: string) => {
        setLikeList(decodeJwt(token).likeList);
    }

    const handleClickLike = async () => {
        let res;
        if (likeList.includes(props.id)) {
            res = await likeApi(props.id, true);
            if (myLikeCnt === 0) {
                setMyLikeCnt(-1);
            } else {
                setMyLikeCnt(0);
            }
        } else {
            res = await likeApi(props.id, false);
            if (myLikeCnt === 0) {
                setMyLikeCnt(1);
            } else {
                setMyLikeCnt(0);
            }
        }

        if (res.status) {
            updateLikeList(res.contents.newToken);
        } else {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
            return null
        }
    }
    // end; like

    // favorite
    const [favoriteList, setFavoriteList] = React.useState<Array<number>>(
        boolLoginStatus && token
            ? decodeJwt(token).favoriteList
            : []
    );

    const updateFavoriteList = (token: string) => {
        setFavoriteList(decodeJwt(token).favoriteList);
    }

    const handleClickFavorite = async () => {
        const res = await favoriteApi(props.id, favoriteList.includes(props.id));

        if (res.status) {
            updateFavoriteList(res.contents.newToken);
        } else {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
            return null
        }
    }
    // end; favorite

    // report
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
            setReportCommentHelperText("Max 140 letters. Now, " + ipt.length);
        }else{
            setReportCommentError(false);
            setReportCommentHelperText("");
        }
        setReportComment(ipt);
    }

    const handleClickReport = async () => {
        if (reportComment !== "" && reportComment.length <= maxLenReportComment) {
            handleCloseReportDialog();
            const res = await reportApi(props.id, reason, reportComment);
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
    // end; report

    // delete
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    }
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }

    const deleteDialogComp = (
        <Dialog
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
        >
            <DialogTitle>
                {"Delete for sure?"}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    After this confirmation, this contents would be deleted permanently.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
                <Button onClick={props.handleClickDelete} autoFocus>Delete</Button>
            </DialogActions>

        </Dialog>
    );
    // end; delete

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
                sx={{ minWidth: 300}}
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

            {reportDialogComp}
            {deleteDialogComp}

            <Card sx={{
                minWidth: packWidth,
                maxWidth: packWidth
            }}>

                <CardHeader
                    avatar={
                        <Link
                            to={`/mypage/${props.contributorId}`}
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}
                        >
                            <UserAvatar badge={props.badge} />
                        </Link>
                    }
                    action={
                        <div>
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
                        </div>
                    }
                    title={props.title}
                    subheader={
                        <Grid container direction="row" spacing={2}>
                            <Grid item>
                                {props.contributor}
                            </Grid>
                            <Grid item>
                                {props.like + myLikeCnt} Like
                            </Grid>
                        </Grid>
                    }
                />

                <Link
                    to={"/routine_contents/" + props.id}
                    style={{
                        textDecoration: "none",
                        color: "white",
                    }}
                >
                    <CardMedia
                        component="img"
                        height="194"
                        image={process.env.PUBLIC_URL + "/logo192.png"}
                        alt="Paella dish"
                    />
                </Link>

                <CardContent>
                    <TextWithLimitation
                        maxWidth={packWidth}
                        text={props.desc}
                    />
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        disabled={props.editable || props.contributorId === userId}
                        onClick={handleClickLike}
                    >
                        {(likeList.includes(props.id)
                            ? <FavoriteIcon />
                            : <FavoriteBorderIcon />
                        )}
                    </IconButton>

                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>

                    <IconButton
                        aria-label="add to favorites"
                        disabled={props.editable || props.contributorId === userId}
                        onClick={handleClickFavorite}
                    >
                        {(favoriteList.includes(props.id)
                            ? <BookmarkIcon />
                            : <BookmarkBorderIcon />
                        )}
                    </IconButton>

                    {
                        (props.editable)
                            ?
                            <div>
                                <IconButton onClick={props.handleClickEdit}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={handleOpenDeleteDialog}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            : <div />
                    }
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandMoreClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <TextWithLimitation
                            maxWidth={packWidth}
                            text={"1. " + props.titleStep1}
                        />
                        <TextWithLimitation
                            maxWidth={packWidth}
                            text={props.descStep1}
                        />
                        <Typography paragraph>...</Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}

export default RoutinePack;