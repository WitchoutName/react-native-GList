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

export default function BackArrowIcon(props) {
  let color = "#000";
  return (
    <Svg height={props.height} width={props.width} viewBox="-50 -50 1028 1028">
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
          <G scale="1" x="240" y="240">
            <Path
              d="M420.361,192.229c-1.83-0.297-3.682-0.434-5.535-0.41H99.305l6.88-3.2c6.725-3.183,12.843-7.515,18.08-12.8l88.48-88.48
			c11.653-11.124,13.611-29.019,4.64-42.4c-10.441-14.259-30.464-17.355-44.724-6.914c-1.152,0.844-2.247,1.764-3.276,2.754
			l-160,160C-3.119,213.269-3.13,233.53,9.36,246.034c0.008,0.008,0.017,0.017,0.025,0.025l160,160
			c12.514,12.479,32.775,12.451,45.255-0.063c0.982-0.985,1.899-2.033,2.745-3.137c8.971-13.381,7.013-31.276-4.64-42.4
			l-88.32-88.64c-4.695-4.7-10.093-8.641-16-11.68l-9.6-4.32h314.24c16.347,0.607,30.689-10.812,33.76-26.88
			C449.654,211.494,437.806,195.059,420.361,192.229z"
            />
          </G>
        </ClipPath>
      </Defs>
      <Rect
        x="0"
        y="0"
        width="1000"
        height="1000"
        fill="url(#grad1)"
        clipPath="url(#clip)"
      />
    </Svg>
  );
}
