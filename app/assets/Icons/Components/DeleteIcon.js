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

export default function DeleteIcon(props) {
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
          <G scale="0.65" x="31" y="31" transform="rotate(45.001 24 24)">
            <Rect width="110" height="18" y="15" x="9" rx="9" fill="#111" />
            <Rect width="18" height="110" y="-30" x="54" rx="9" fill="#111" />
            <Rect width="18" height="18" y="15" x="54" fill="#111" />
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

// export default function DeleteIcon(props){
//     let color = "#F44336"
//     return(
//         <SvgXml width={props.width} height={props.height} xml={
//             `<svg viewBox="0 0 48 48"><path fill="${props.color ? props.color : color}" d="M21.5 4.5H26.501V43.5H21.5z" transform="rotate(45.001 24 24)"/><path fill="${props.color ? props.color : color}" d="M21.5 4.5H26.5V43.501H21.5z" transform="rotate(135.008 24 24)"/></svg>
//        `
//        } />
//     )
// }
