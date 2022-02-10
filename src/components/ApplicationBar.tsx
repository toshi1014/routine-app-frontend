import React from 'react';
import {
    InputBase,
    IconButton,
    Toolbar,
    Box,
    Grid,
    AppBar,
    Typography,
    Paper,
    Stack,
} from "@mui/material";
import {
    styled,
    alpha,
} from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import MenuDrawer from "./MenuDrawer";
import useWindowSize from "../utils/useWindowSize";
import { decodeJwt } from "../utils/utils";


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const token = localStorage.getItem("token")
const boolLoginStatus = (token === null) ? false : true;
const userId = (token === null) ? null : decodeJwt(token).id;
const myBadge = (token === null) ? null : decodeJwt(token).badge;

function ApplicationBar() {
    const navigate = useNavigate();
    const [innerWidth, innerHeight] = useWindowSize();
    const [openMenuDrawer, setOpenMenuDrawer] = React.useState(false);

    const toggleMenuDrawer =
        () =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setOpenMenuDrawer(!openMenuDrawer);
            };

    const handleClickLogout = () => {
        localStorage.removeItem("token");
        navigate("");
        window.location.reload();
    }

    const loginLink = (
        <Paper elevation={20} sx={{ height: 40 }} >
            <IconButton onClick={() => navigate("login")}>
                <LoginIcon />
            </IconButton>
        </Paper>
    );

    const userAvatarWithLogoutLink = (
        <Stack direction="row" alignItems="center" spacing={1}>
            <UserAvatar userId={userId} badge={myBadge} />
            <Paper elevation={20} sx={{ height: 40 }} >
                <IconButton onClick={handleClickLogout}>
                    <LogoutIcon />
                </IconButton>
            </Paper>
        </Stack>
    );

    const searchBarComp = (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    );

    return (
        <div>
            <MenuDrawer
                openMenuDrawer={openMenuDrawer}
                toggleMenuDrawer={toggleMenuDrawer}
            />

            <Box>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container alignItems="center" direction="row">
                            <Grid item>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="open drawer"
                                    sx={{ mr: 1 }}
                                    onClick={toggleMenuDrawer()}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Grid>

                            <Grid item sx={{ flexGrow: 1 }}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{
                                        mt: 0.5,
                                    }}
                                >
                                    Foo
                                </Typography>
                            </Grid>

                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    {boolLoginStatus
                                        ? userAvatarWithLogoutLink
                                        : loginLink
                                    }
                                </Stack>
                            </Grid>

                            <Grid item>
                                {(innerWidth > 600
                                    ? searchBarComp
                                    : <div />
                                )}
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default ApplicationBar;