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

export default function TickIcon(props) {
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
          <G
            scale="0.55"
            x="15"
            y="38"
            transform="rotate(-45.001,118.37702,76.939119)"
          >
            <Rect width="18" height="70" y="-14.004595" x="73.258293" rx="9" />
            <Rect width="110" height="18" y="37.995403" x="73.258293" rx="9" />
            <Path
              d="m 100.39903,-25.1015 c 0.0254,5.770307 -4.74314,9.231415 -9.006948,9.160306 -4.174322,0.07126 -8.925503,-3.241243 -9.020924,-9.134266 0.153754,-3.902505 2.451324,-6.013211 2.451324,-6.013211 6.421109,-6.421922 6.572449,-6.5766 6.572449,-6.5766 l 6.548376,6.553311 c 0,0 2.606413,2.630981 2.455723,6.01046 z"
              transform="rotate(45.001)"
            />
            {/* <Rect width="18" height="18" y="15" x="54" fill="#111" /> */}
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
