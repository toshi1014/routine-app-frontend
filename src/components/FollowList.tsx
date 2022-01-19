import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Dialog,
    DialogTitle,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { UserNameIdBadge } from "../utils/Types";
import { defaultUserList } from "../utils/defaultValues";
import { getFollowingOrFollowersApi } from "../api_handlers/handle";
import UserAvatar from "./UserAvatar";


type Props = {
    open: boolean;
    userId: number;
    title: string;
    onClose: () => void;
}

function FollowList(props: Props) {
    const navigate = useNavigate();

    const [userList, setUserList] = React.useState<Array<UserNameIdBadge>>(defaultUserList);

    const handleClickListItem = (user: UserNameIdBadge) => {
        props.onClose();
        navigate("/mypage/" + user.userId);
        window.location.reload();
    }

    React.useEffect(() => {
        const init = async () => {
            let following_or_followers = "";
            if (props.title === "Following") {
                following_or_followers = "following";
            } else if (props.title === "Followers") {
                following_or_followers = "followers";
            } else { throw new Error; }

            const res = await getFollowingOrFollowersApi(props.userId, following_or_followers);
            if (res.status) {
                setUserList(res.contents.userList);
            } else { throw new Error; }
        }
        if (props.open) {
            init();
        }
    }, [props.open])

    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>{props.title}</DialogTitle>
            <List sx={{ pt: 0, minWidth: 200 }}>
                {userList.map((user: UserNameIdBadge, idx: number) => (
                    <ListItem button onClick={() => handleClickListItem(user)} key={idx}>
                        <ListItemAvatar>
                            <UserAvatar
                                userId={user.userId}
                                badge="noBadge"
                            />
                        </ListItemAvatar>
                        <ListItemText primary={user.username} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

export default FollowList;