import React from "react";
import {
  Path,
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  G,
  ClipPath,
} from "react-native-svg";

import Color from "../../../classes/Color";

export default function EditIcon(props) {
  let color = "#000";
  return (
    <Svg height={props.height} width={props.width} viewBox="0 0 128 128">
      <Defs>
        <LinearGradient
          id="grad1"
          x1="0"
          y1="0"
          x2="1"
          y2="1"
          gradientTransform="rotate(90)"
        >
          <Stop offset="0" stopColor={Color.purple} stopOpacity="1" />
          <Stop offset="1" stopColor={Color.blue} stopOpacity="1" />
        </LinearGradient>
        <ClipPath id="clip">
          <G scale="2.8" x="30" y="30">
            <Path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
          </G>
        </ClipPath>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="url(#grad1)"
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
//     let color = "#0F2D40"
//     return(
//         <SvgXml width={props.width} height={props.height} xml={
//         `
//         <svg fill="${props.color ? props.color : color}" viewBox="0 0 24 24" width="48px" height="48px">    <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"/></svg>
//         `

//        } />
//     )
// }
