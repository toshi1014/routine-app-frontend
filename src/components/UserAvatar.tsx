import React from 'react';
import { styled } from "@mui/material/styles";
import { Avatar } from '@mui/material';
import Badge, { BadgeProps } from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge as TypeBadge } from "../utils/Types";

type Props = {
    badge: TypeBadge,
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 0,
        top: 30,
        padding: '0 4px',
    },
}));

function UserAvatar(props: Props) {
    const badgeSize = 30;

    const [badgeIcon, setBadgeIcon] = React.useState("");

    React.useEffect(() => {
        let badgeIconTmp = "";
        if (props.badge === "noBadge"){
        }else if (props.badge === "l1") {
            badgeIconTmp = "ninja";
        } else if (props.badge === "l2") {
            badgeIconTmp = "samurai";
        } else if (props.badge === "l3") {
            badgeIconTmp = "yokozuna";
        }else{ throw new Error;}

        setBadgeIcon(badgeIconTmp);
    }, [])

    return (
        props.badge === "noBadge"
            ? <Avatar>X</Avatar>
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
                <Avatar>X</Avatar>
            </StyledBadge>
    );
}

export default UserAvatar;