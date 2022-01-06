import React from 'react';
import {
    Card,
    Grid,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    CardHeader,
    CardMedia,
    Button,
    CardContent,
    CardActions,
    Typography,
    Collapse,
} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import TextWithLimitation from "./TextWithLimitation";
import UserAvatar from "./UserAvatar";
import { RoutinePackContents } from "../utils/Types";
import { decodeJwt } from "../utils/utils";
import LikeButton from "./LikeButton";
import FavoriteButton from "./FavoriteButton";
import MenuButton from "./MenuButton";


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


const token = localStorage.getItem("token")
const userId = (token === null) ? null : decodeJwt(token).id;

type Props = RoutinePackContents & {
    editable?: boolean;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
}

function RoutinePack(props: Props) {
    const packWidth = 345;

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandMoreClick = () => {
        setExpanded(!expanded);
    };

    const [myLikeCnt, setMyLikeCnt] = React.useState(0);

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

    return (
        <div>
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
                        <MenuButton postId={props.id} />
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
                    <LikeButton
                        postId={props.id}
                        disabled={props.editable || props.contributorId === userId}
                        myLikeCnt={myLikeCnt}
                        setMyLikeCnt={setMyLikeCnt}
                    />

                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>

                    <FavoriteButton
                        postId={props.id}
                        disabled={props.editable || props.contributorId === userId}
                    />

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