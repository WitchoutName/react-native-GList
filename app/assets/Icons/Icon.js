import React from "react";
import PlusIcon from "./Components/PlusIcon";
import DotsIcon from "./Components/DotsIcon";
import PostIcon from "./Components/PostIcon";
import HeartIcon from "./Components/HeartIcon";
import DeleteIcon from "./Components/DeleteIcon";
import EditIcon from "./Components/EditIcon";
import HamburgerIcon from "./Components/HamburgerIcon";
import LogoutIcon from "./Components/LogoutIcon";
import BackArrowIcon from "./Components/BackArrowIcon";
import SearchIcon from "./Components/SearchIcon";
import TickIcon from "./Components/TickIcon";
import GoogleIcon from "./Components/GoogleIcon";

function Icon(props) {
  const icons = {
    plus: (
      <PlusIcon
        width={props.width ? props.width : 35}
        height={props.height ? props.height : 35}
        color={props.color}
      />
    ),
    dots: (
      <DotsIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    post: (
      <PostIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    heart: (
      <HeartIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    delete: (
      <DeleteIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    edit: (
      <EditIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    hamburger: (
      <HamburgerIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    logout: (
      <LogoutIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    backArrow: (
      <BackArrowIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    search: (
      <SearchIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    tick: (
      <TickIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
    google: (
      <GoogleIcon
        width={props.width ? props.width : 20}
        height={props.height ? props.height : 20}
        color={props.color}
      />
    ),
  };

  return props.name ? icons[props.name] : null;
}

export default Icon;
