import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Dialog,
    DialogTitle,
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { UserNameId } from "../utils/Types";
import { defaultUserList } from "../utils/defaultValues";
import { getFollowingOrFollowersApi } from "../api_handlers/handle";


type Props = {
    open: boolean;
    userId: number;
    title: string;
    onClose: () => void;
}

function FollowList(props: Props) {
    const avatarSize = 35;
    const navigate = useNavigate();

    const [userList, setUserList] = React.useState<Array<UserNameId>>(defaultUserList);

    const handleClickListItem = (user: UserNameId) => {
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
                {userList.map((user: UserNameId, idx: number) => (
                    <ListItem button onClick={() => handleClickListItem(user)} key={idx}>
                        <ListItemAvatar>
                            <Avatar
                                alt="Smiley"
                                src={process.env.PUBLIC_URL + "/static/demo/face.png"}
                                sx={{
                                    width: avatarSize,
                                    height: avatarSize,
                                }}
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