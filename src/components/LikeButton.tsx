import React from 'react';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";
import { decodeJwt } from "../utils/utils";
import { likeApi } from "../api_handlers/handle";

type Props = {
    postId: number;
    disabled: boolean;
    myLikeCnt: number;
    setMyLikeCnt: React.Dispatch<React.SetStateAction<number>>;
}

const token = localStorage.getItem("token");
const boolLoginStatus = (token === null) ? false : true;

function LikeButton(props: Props) {
    const navigate = useNavigate();

    const [likeList, setLikeList] = React.useState<Array<number>>(
        boolLoginStatus && token
            ? decodeJwt(token).likeList
            : []
    );

    const updateLikeList = (token: string) => {
        setLikeList(decodeJwt(token).likeList);
    }

    const handleClickLike = async () => {
        let res;
        if (likeList.includes(props.postId)) {
            res = await likeApi(props.postId, true);
            if (props.myLikeCnt === 0) {
                props.setMyLikeCnt(-1);
            } else {
                props.setMyLikeCnt(0);
            }
        } else {
            res = await likeApi(props.postId, false);
            if (props.myLikeCnt === 0) {
                props.setMyLikeCnt(1);
            } else {
                props.setMyLikeCnt(0);
            }
        }

        if (res.status) {
            updateLikeList(res.contents.newToken);
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
            onClick={handleClickLike}
        >
            {(likeList.includes(props.postId)
                ? <FavoriteIcon />
                : <FavoriteBorderIcon />
            )}
        </IconButton>

    );
}

export default LikeButton;