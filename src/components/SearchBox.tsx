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
import { useNavigate } from "react-router-dom";


type Props = {
    defaultValue: string;
    defaultTarget: string;
    menuContentList: Array<string>;
}

function SearchBox(props: Props) {
    const navigate = useNavigate();
    const [searchBoxValue, setSearchBoxValue] = React.useState(
        props.defaultTarget === "hashtag"
            ? "#" + props.defaultValue
            : props.defaultValue
    );
    const handleChangeSearchBoxValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBoxValue(event.target.value);
    };

    const uppercasedMenuContentList = props.menuContentList.map(val => val.toLowerCase());

    // Menu
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const [selectedMenuIdx, setSelectedMenuIdx] = React.useState(
        (
            props.defaultTarget === ""
                ? 0             // default
                : (
                    uppercasedMenuContentList.includes(props.defaultTarget)
                        ? uppercasedMenuContentList.indexOf(props.defaultTarget)
                        : 0     // if unexpected target found
                )
        )
    );

    const menuItemList = props.menuContentList.map((menuContent: string, idx: number) =>
        <MenuItem
            onClick={(event) => handleMenuContentClick(event, idx)}
            selected={idx === selectedMenuIdx}
            key={idx}
        >
            {menuContent}
        </MenuItem>
    );

    const handleMenuClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        setAnchorEl(event.currentTarget);
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const handleMenuContentClick = (
        event: React.MouseEvent<HTMLElement>,
        idx: number
    ) => {
        setSelectedMenuIdx(idx)
        handleMenuClose();
    }
    // end; Menu

    const handleSearch = async () => {
        if (searchBoxValue !== "") {
            // TODO: add url validation
            let searchBoxValueTmp = searchBoxValue;
            let targetTmp = props.menuContentList[selectedMenuIdx].toLowerCase();
            if (searchBoxValue[0] === "#") {
                targetTmp = "hashtag";
                searchBoxValueTmp = searchBoxValueTmp.substring(1);
            }
            navigate(`/search_results/${searchBoxValueTmp}/${targetTmp}/1`);
            window.location.reload();
        }
    }


    return (
        <Paper
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: "auto",
                maxWidth: 400,
            }}
        >
            <IconButton
                sx={{ p: '10px' }}
                aria-label="menu"
                onClick={handleMenuClick}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
            >
                {menuItemList}
            </Menu>

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                defaultValue={searchBoxValue}
                onChange={handleChangeSearchBoxValue}
                onKeyPress={(event: React.KeyboardEvent) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <IconButton onClick={handleSearch} sx={{ p: '10px' }}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

export default SearchBox;