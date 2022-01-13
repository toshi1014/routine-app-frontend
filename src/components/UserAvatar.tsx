import React from 'react';
import { styled } from "@mui/material/styles";
import {
    Avatar,
    IconButton,
} from '@mui/material';
import Badge, { BadgeProps } from "@mui/material/Badge";
import { Badge as TypeBadge } from "../utils/Types";
import { Link } from "react-router-dom";
import { decodeJwt } from "../utils/utils";
import { downloadImageURL } from "../firebase/handler";
import { defaultId } from "../utils/defaultValues";

type Props = {
    userId: number;
    badge: TypeBadge;
    size?: number;
    openFileSelector?: () => void;
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: 30,
        padding: '0 4px',
    },
}));

const defaultAvatarSize = 40;
const token = localStorage.getItem("token")
const myId = (token === null) ? null : decodeJwt(token).id;

function UserAvatar(props: Props) {
    const badgeSizeOrgn = 30;
    const badgeSize = (props.size ? badgeSizeOrgn * (props.size / defaultAvatarSize) : badgeSizeOrgn);

    const [badgeIcon, setBadgeIcon] = React.useState("");
    const [avatarSrc, setAvatarSrc] = React.useState("");

    React.useEffect(() => {
        const init = async () => {
            let badgeIconTmp = "";
            if (props.badge === "noBadge") {
            } else if (props.badge === "l1") {
                badgeIconTmp = "ninja";
            } else if (props.badge === "l2") {
                badgeIconTmp = "samurai";
            } else if (props.badge === "l3") {
                badgeIconTmp = "yokozuna";
            } else { throw new Error; }

            setBadgeIcon(badgeIconTmp);

            // if my avatar, get from localStorage
            // if not, fetch from cloud storage
            if (myId === props.userId) {
                const imageURL = localStorage.getItem("myAvatar")
                if (imageURL) setAvatarSrc(imageURL);
            } else if (props.userId === defaultId) {
                // ignore when defaultUserId came
            } else {
                setAvatarSrc(await downloadImageURL("avatar-" + props.userId));
            }
        }

        init();
    }, [props.userId])

    const avatarImage = (
        <Avatar
            src={avatarSrc}
            sx={{
                width: props.size,
                height: props.size
            }}>
        </Avatar>
    );

    const avatarComp = (props.badge === "noBadge"
        ? <div>{avatarImage}</div>
        : <StyledBadge
            badgeContent={
                <Avatar
                    src={process.env.PUBLIC_URL + "/static/badges/" + badgeIcon + ".png"}
                    sx={{
                        width: badgeSize,
                        height: badgeSize,
                    }}
                />
            }
        >
            {avatarImage}
        </StyledBadge>
    );

    return (
        props.openFileSelector
            ? <IconButton
                sx={{ mx: -1, my: -1 }}
                onClick={props.openFileSelector}
            >
                {avatarComp}
            </IconButton>
            : <Link
                to={(myId === props.userId ? "/mypage_login" : `/mypage/${props.userId}`)}
                style={{
                    textDecoration: "none",
                    color: "white",
                }}
            >
                {avatarComp}
            </Link>
    );
}

export default UserAvatar;