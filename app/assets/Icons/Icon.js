import React from 'react';
import PlusIcon from "./Components/PlusIcon"
import DotsIcon from "./Components/DotsIcon"
import PostIcon from "./Components/PostIcon"
import HeartIcon from "./Components/HeartIcon"
import DeleteIcon from "./Components/DeleteIcon"
import EditIcon from "./Components/EditIcon"



function Icon(props){
    const icons = {
        "plus": <PlusIcon width={props.width ? props.width : 35} height={props.height ? props.height : 35} color={props.color} />,
        "dots": <DotsIcon width={props.width ? props.width : 20} height={props.height ? props.height : 20} color={props.color} />,
        "post": <PostIcon width={props.width ? props.width : 20} height={props.height ? props.height : 20} color={props.color} />,
        "heart": <HeartIcon width={props.width ? props.width : 20} height={props.height ? props.height : 20} color={props.color} />,
        "delete": <DeleteIcon width={props.width ? props.width : 20} height={props.height ? props.height : 20} color={props.color} />,
        "edit": <EditIcon width={props.width ? props.width : 20} height={props.height ? props.height : 20} color={props.color} />
    }

    return props.name ? icons[props.name] : null
};

export default Icon;