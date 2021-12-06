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
import WebIcon from '@mui/icons-material/Web';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Link,
} from "react-router-dom";


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

type IconName = {
    icon: React.ReactElement;
    name: string;
    link: string;
};

const upperIconNameList: Array<IconName> = [
    {
        icon: <WebIcon />,
        name: "Top",
        link: "",
    },
    {
        icon: <HomeIcon />,
        name: "MyPage",
        link: "mypage",
    },
    {
        icon: <PostAddIcon />,
        name: "Post",
        link: "post",
    },
    {
        icon: <SearchIcon />,
        name: "Search",
        link: "search_results",
    },
];

const lowerIconNameList: Array<IconName> = [
    {
        icon: <LoginIcon />,
        name: "Login",
        link: "login"
    },
    {
        icon: <LogoutIcon />,
        name: "Logout",
        link: "",        // TEMP: link for logout
    },
];


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
                {upperIconNameList.map((iconNameLink: IconName, idx: number) => (
                    <Link
                        to={"/" + iconNameLink.link}
                        style={{
                            textDecoration: "none",
                            color: "white",
                        }}
                        key={idx}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                {iconNameLink.icon}
                            </ListItemIcon>
                            <ListItemText primary={iconNameLink.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {lowerIconNameList.map((iconNameLink: IconName, idx: number) => (
                    <Link
                        to={"/" + iconNameLink.link}
                        style={{
                            textDecoration: "none",
                            color: "white",
                        }}
                        key={idx}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                {iconNameLink.icon}
                            </ListItemIcon>
                            <ListItemText primary={iconNameLink.name} />
                        </ListItem>
                    </Link>
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
