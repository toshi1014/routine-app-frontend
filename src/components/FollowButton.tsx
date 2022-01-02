import React from 'react';
import {
    Chip,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { followApi } from "../api_handlers/handle";
import { decodeJwt } from "../utils/utils";


const token = localStorage.getItem("token")
const boolLoginStatus = (token === null) ? false : true;
const userId = (token === null) ? null : decodeJwt(token).id;

type Props = {
    targetUserId: number;
    disabled?: boolean;
    myFollowCnt?: number;
    setMyFollowCnt?: React.Dispatch<React.SetStateAction<number>>;
}

function FollowButton(props: Props) {
    const navigate = useNavigate();

    const [followingList, setFollowingList] = React.useState<Array<number>>(
        boolLoginStatus && token
            ? decodeJwt(token).followingList
            : []
    );

    const updateFollowingList = (token: string) => {
        setFollowingList(decodeJwt(token).followingList);
    }


    const handleClickFollow = async () => {
        let res;
        if (followingList.includes(props.targetUserId)) {
            res = await followApi(props.targetUserId, true);
            if (props.setMyFollowCnt) {
                if (props.myFollowCnt === 0) {
                    props.setMyFollowCnt(-1);
                } else {
                    props.setMyFollowCnt(0);
                }
            }
        } else {
            res = await followApi(props.targetUserId, false)
            if (props.setMyFollowCnt) {
                if (props.myFollowCnt === 0) {
                    props.setMyFollowCnt(1);
                } else {
                    props.setMyFollowCnt(0);
                }
            }
        }

        if (res.status) {
            updateFollowingList(res.token);
        } else {
            // force logout & redirect to login
            localStorage.removeItem("token");
            navigate("/login");
            window.location.reload();
            return null
        }
    }
    // end; follow

    return (
        <Chip
            clickable
            disabled={props.disabled || (userId === props.targetUserId)}
            onClick={handleClickFollow}
            variant={
                followingList.includes(props.targetUserId)
                    ? "filled"
                    : "outlined"
            }
            label="follow"
        />

    );
}

export default FollowButton;