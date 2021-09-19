import React from "react";
import {
  SvgXml,
  Svg,
  Defs,
  LinearGradient,
  Stop,
  Rect,
  G,
  ClipPath,
  Path,
} from "react-native-svg";
import Color from "../../../classes/Color";

// export default function HeartIcon(props){
//     let color = "#ff0000"
//     return(
//         <SvgXml width={props.width} height={props.height} xml={
//         `
//         <svg fill="${props.color ? props.color : color}" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
//         `

//        } />
//     )
// }

export default function HeartIcon(props) {
  let color = "#ff0000";
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
          <G scale="3.5" x="22" y="25">
            <G style="fill:#ffffff">
              <Path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
            </G>
          </G>
        </ClipPath>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="128"
        height="128"
        fill="url(#grad1)"
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
