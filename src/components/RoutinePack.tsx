import React from 'react';
import {
    Card,
    Grid,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
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
    Avatar,
    Collapse,
} from "@mui/material";
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
import {
    Link,
    useNavigate,
} from "react-router-dom";
import TextWithLimitation from "./TextWithLimitation";
import { RoutinePackContents } from "../utils/Types";
import { decodeJwt } from "../utils/utils";
import { favoriteApi } from "../api_handlers/handle";


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

type Props = RoutinePackContents & {
    editable?: boolean;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
}

const token = localStorage.getItem("token")
const boolLoginStatus = (token === null) ? false : true;

function RoutinePack(props: Props) {
    const avatarSize = 35;
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

    const [openDialog, setOpenDialog] = React.useState(false);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }
    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    // favotite
    const [myFavoriteCnt, setMyFavoriteCnt] = React.useState(0);

    const [favoriteList, setFavoriteList] = React.useState<Array<number>>(
        boolLoginStatus && token
            ? decodeJwt(token).favoriteList
            : []
    );

    const updateFavoriteList = (token: string) => {
        setFavoriteList(decodeJwt(token).favoriteList);
    }

    const handleClickFavorite = async () => {
        let res;
        if (favoriteList.includes(props.id)){
            res = await favoriteApi(props.id, true);
            if (myFavoriteCnt === 0){
                setMyFavoriteCnt(-1);
            }else{
                setMyFavoriteCnt(0);
            }
        }else{
            res = await favoriteApi(props.id, false);
            if (myFavoriteCnt === 0){
                setMyFavoriteCnt(1);
            }else{
                setMyFavoriteCnt(0);
            }
        }

        if (res.status) {
            updateFavoriteList(res.token);
        } else {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
            return null
        }
    }

    const dialogComp = (
        <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
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
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={props.handleClickDelete} autoFocus>Delete</Button>
            </DialogActions>

        </Dialog>
    );


    return (
        <div>

            {dialogComp}

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
                            <Avatar
                                alt="Smiley"
                                src={process.env.PUBLIC_URL + "/static/demo/face.png"}
                                sx={{ width: avatarSize, height: avatarSize }}
                            />
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
                                <MenuItem>
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
                                {props.like + myFavoriteCnt} Like
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
                        disabled={(props.editable ? true : false)}
                        onClick={handleClickFavorite}
                    >
                        {(favoriteList.includes(props.id)
                            ? <FavoriteIcon />
                            : <FavoriteBorderIcon />
                        )}
                    </IconButton>

                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    {
                        (props.editable)
                            ?
                            <div>
                                <IconButton onClick={props.handleClickEdit}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={handleOpenDialog}>
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