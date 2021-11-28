import React from 'react';
import {
    Box,
    SwipeableDrawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Avatar,
    Collapse,
} from "@mui/material";
import {
    styled,
} from "@mui/material/styles";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


// TEMP:
const username = "John Smith";
const email = "john.smith@gmail.com";
const userinfo = "foo";


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
    openMenuDrawer: boolean;
    toggleMenuDrawer: () =>
        (event: React.KeyboardEvent | React.MouseEvent) =>
            void;
}


function MenuDrawer(props: Props) {
    const avatarSize = 35;

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandMoreClick = () => {
        setExpanded(!expanded);
    };

    const myStatus = (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Smiley"
                        src="static/demo/face.jpg"
                        sx={{ width: avatarSize, height: avatarSize }}
                    />
                }
                title={username}
                subheader={email}
                action={
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandMoreClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                }
            />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {userinfo}
                </CardContent>
            </Collapse>
        </Card>
    );

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={props.toggleMenuDrawer()}
            onKeyDown={props.toggleMenuDrawer()}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key="left">
                <SwipeableDrawer
                    anchor="left"
                    open={props.openMenuDrawer}
                    onClose={props.toggleMenuDrawer()}
                    onOpen={props.toggleMenuDrawer()}
                >
                    {myStatus}
                    {list()}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default MenuDrawer;
