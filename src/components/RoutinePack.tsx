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

type Props = RoutinePackContents & {
    editable?: boolean;
    handleClickEdit?: () => void;
    handleClickDelete?: () => void;
}

function RoutinePack(props: Props) {
    const PACK_WIDTH = 345;

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

    const handleClickDelete = () => {
        handleCloseDeleteDialog();
        if (props.handleClickDelete) props.handleClickDelete();
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
                <Button onClick={handleClickDelete} autoFocus>Delete</Button>
            </DialogActions>

        </Dialog>
    );
    // end; delete

    return (
        <div>
            {deleteDialogComp}

            <Card sx={{
                minWidth: PACK_WIDTH,
                maxWidth: PACK_WIDTH
            }}>

                <CardHeader
                    avatar={
                        <UserAvatar userId={props.contributorId} badge={props.badge} />
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
                        maxWidth={PACK_WIDTH}
                        text={props.desc}
                    />
                </CardContent>

                <CardActions disableSpacing>
                    <LikeButton
                        postId={props.id}
                        contributorId={props.contributorId}
                        myLikeCnt={myLikeCnt}
                        setMyLikeCnt={setMyLikeCnt}
                    />

                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>

                    <FavoriteButton
                        postId={props.id}
                        contributorId={props.contributorId}
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
                            maxWidth={PACK_WIDTH}
                            text={"1. " + props.titleStep1}
                        />
                        <TextWithLimitation
                            maxWidth={PACK_WIDTH}
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