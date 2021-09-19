import React from "react";
import { SvgXml } from "react-native-svg";


export default function HeartIcon(props){
    let color = "#ff0000"
    return(
        <SvgXml width={props.width} height={props.height} xml={
        `
        <svg fill="${props.color ? props.color : color}" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
        `
       
       } />
    )
}