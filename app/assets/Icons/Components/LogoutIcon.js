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

export default function LogoutIcon(props) {
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
          <G scale="0.5" x="35" y="35">
            <G>
              <Path
                d="M86,28.074v-20.7c0-3.3-2.699-6-6-6H6c-3.3,0-6,2.7-6,6v3.9v78.2v2.701c0,2.199,1.3,4.299,3.2,5.299l45.6,23.601
		c2,1,4.4-0.399,4.4-2.7v-23H80c3.301,0,6-2.699,6-6v-32.8H74v23.8c0,1.7-1.3,3-3,3H53.3v-30.8v-19.5v-0.6c0-2.2-1.3-4.3-3.2-5.3
		l-26.9-13.8H71c1.7,0,3,1.3,3,3v11.8h12V28.074z"
              />
              <Path
                d="M101.4,18.273l19.5,19.5c2.5,2.5,2.5,6.2,0,8.7l-19.5,19.5c-2.5,2.5-6.301,2.601-8.801,0.101
		c-2.399-2.399-2.1-6.4,0.201-8.8l8.799-8.7H67.5c-1.699,0-3.4-0.7-4.5-2c-2.8-3-2.1-8.3,1.5-10.3c0.9-0.5,2-0.8,3-0.8h34.1
		c0,0-8.699-8.7-8.799-8.7c-2.301-2.3-2.601-6.4-0.201-8.7C95,15.674,98.9,15.773,101.4,18.273z"
              />
            </G>
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
