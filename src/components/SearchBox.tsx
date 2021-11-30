import React from 'react';
import {
    Paper,
    InputBase,
    Divider,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


type Props = {
    anchorEl: null | HTMLElement;

    searchBoxValue: string;

    onChange: (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;

    menuContents: Array<string>;

    handleMenuClick: (
        event: React.MouseEvent<HTMLButtonElement>
    ) => void;

    handleMenuClose: () => void;

    handleMenuContentClick: (
        event: React.MouseEvent<HTMLElement>,
        idx: number
    ) => void;
}

function SearchBox(props: Props) {
    const openMenu = Boolean(props.anchorEl);

    const menuItemList = props.menuContents.map((menuContent: string, idx: number) =>
        <MenuItem
            onClick={(event) => props.handleMenuContentClick(event, idx)}
        >
            {menuContent}
        </MenuItem>
    );

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400
            }}
        >
            <IconButton
                sx={{ p: '10px' }}
                aria-label="menu"
                onClick={props.handleMenuClick}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={props.anchorEl}
                open={openMenu}
                onClose={props.handleMenuClose}
            >
                {menuItemList}
            </Menu>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                onChange={props.onChange}
                value={props.searchBoxValue}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchBox;