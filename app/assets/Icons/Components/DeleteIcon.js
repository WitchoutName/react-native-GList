import React from "react";
import { SvgXml } from "react-native-svg";


export default function DeleteIcon(props){
    let color = "#F44336"
    return(
        <SvgXml width={props.width} height={props.height} xml={
            `<svg viewBox="0 0 48 48"><path fill="${props.color ? props.color : color}" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/><path fill="${props.color ? props.color : color}" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"/></svg>
       `
       } />
    )
}