import React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from "@mui/icons-material/Share";
import TextWithLimitation from "./TextWithLimitation";


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

type Props = {
    contributor: string;
    title: string;
    desc: string;
    lastUpdated: string;
    titleStep1: string;
    descStep1: string;
}

function RoutinePack(props: Props) {
    const avatarSize = 35;
    const packMaxWidth = 345;

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandMoreClick = () => {
        setExpanded(!expanded);
    };


    return (
        <div>
            <Card sx={{ maxWidth: packMaxWidth }}>
                <CardHeader
                    avatar={
                        <Avatar
                            alt="Smiley"
                            src="static/demo/face.png"
                            sx={{ width: avatarSize, height: avatarSize }}
                        />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={props.title}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image="logo192.png"
                    alt="Paella dish"
                />

                <CardContent>
                        <TextWithLimitation
                            maxWidth={packMaxWidth}
                            text={props.desc}
                        />
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
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
                            maxWidth={packMaxWidth}
                            text={"1. " + props.titleStep1}
                        />
                        <TextWithLimitation
                            maxWidth={packMaxWidth}
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