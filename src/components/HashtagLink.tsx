import React from 'react';
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
    hashtag: string;
    onDelete? : () => void;
}

function HashtagLink(props: Props) {
    const navigate = useNavigate();


    const handleClick = () => {
        console.log("Hashtag");
        navigate(`/search_results/${props.hashtag}/hashtag/1`);
    }

    return (
        <Chip
            clickable
            onClick={handleClick}
            label={"# " + props.hashtag}
            onDelete={props.onDelete}
        />
    );
}

export default HashtagLink;