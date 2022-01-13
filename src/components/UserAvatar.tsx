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
const boolLoginStatus = (token === null) ? false : true;
const myId = (token === null) ? null : decodeJwt(token).id;

function UserAvatar(props: Props) {
    const badgeSizeOrgn = 30;
    const badgeSize = (props.size ? badgeSizeOrgn * (props.size / defaultAvatarSize) : badgeSizeOrgn);

    const [badgeIcon, setBadgeIcon] = React.useState("");

    React.useEffect(() => {
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
    }, [])

    const core = (
        <Avatar sx={{ width: props.size, height: props.size }}>X</Avatar>
    );

    const avatarComp = (props.badge === "noBadge"
        ? <div>{core}</div>
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
            {core}
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