import React from 'react';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../utils/utils";
import { favoriteApi } from "../api_handlers/handle";

const token = localStorage.getItem("token");
const boolLoginStatus = (token === null) ? false : true;

type Props = {
    postId: number;
    disabled: boolean;
}

function FavoriteButton(props: Props) {
    const navigate = useNavigate();

    const [favoriteList, setFavoriteList] = React.useState<Array<number>>(
        boolLoginStatus && token
            ? decodeJwt(token).favoriteList
            : []
    );

    const updateFavoriteList = (token: string) => {
        setFavoriteList(decodeJwt(token).favoriteList);
    }

    const handleClickFavorite = async () => {
        const res = await favoriteApi(props.postId, favoriteList.includes(props.postId));

        if (res.status) {
            updateFavoriteList(res.contents.newToken);
        } else {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
            return null
        }
    }

    return (
        <IconButton
            aria-label="add to favorites"
            disabled={props.disabled}
            onClick={handleClickFavorite}
        >
            {(favoriteList.includes(props.postId)
                ? <BookmarkIcon />
                : <BookmarkBorderIcon />
            )}
        </IconButton>

    );
}

export default FavoriteButton;