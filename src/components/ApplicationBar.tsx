import React from 'react';
import {
    InputBase,
    IconButton,
    Toolbar,
    Box,
    AppBar,
    Avatar,
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
import MenuDrawer from "./MenuDrawer";


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


type Props = {
    boolLoginStatus: boolean;
}

function ApplicationBar(props: Props) {
    const avatarSize = 35;
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

    let userStatus;
    if (props.boolLoginStatus) {
        userStatus = (
            <IconButton>
                <LoginIcon />
            </IconButton>
        );
    } else {
        userStatus = (
            <IconButton>
                <LogoutIcon />
            </IconButton>
        );
    }


    return (
        <div>
            <MenuDrawer
                openMenuDrawer={openMenuDrawer}
                toggleMenuDrawer={toggleMenuDrawer}
            />

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={toggleMenuDrawer()}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            Foo
                        </Typography>

                        {props.boolLoginStatus ?
                            <Stack direction="row" spacing={2}>
                                <Avatar
                                    alt="Smiley"
                                    src="static/demo/face.png"
                                    sx={{
                                        width: avatarSize,
                                        height: avatarSize,
                                        my: 0.2,
                                    }}
                                />
                                <Paper elevation={20} sx={{ height: 40 }} >
                                    <IconButton>
                                        <LogoutIcon />
                                    </IconButton>
                                </Paper>
                            </Stack>
                            :
                            <Paper elevation={20} sx={{ height: 40 }} >
                                <IconButton>
                                    <LoginIcon />
                                </IconButton>
                            </Paper>
                        }

                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}

export default ApplicationBar;