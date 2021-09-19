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
} from "react-native-svg";
import Color from "../../../classes/Color";

// export default function HamburgerIcon(props) {
//   let color = "#000";
//   return (
//     <SvgXml
//       width={props.width}
//       height={props.height}
//       xml={`<svg
//             width="200"
//             height="200"
//             viewBox="0 0 128 128"
//             version="1.1"
//             id="svg1891">
//            <sodipodi:namedview
//               id="namedview1893"
//               pagecolor="#ffffff"
//               bordercolor="#999999"
//               borderopacity="1"
//               inkscape:pageshadow="0"
//               inkscape:pageopacity="0"
//               inkscape:pagecheckerboard="0"
//               inkscape:document-units="mm"
//               showgrid="false"
//               inkscape:zoom="1.8101934"
//               inkscape:cx="76.994186"
//               inkscape:cy="111.11312"
//               inkscape:window-width="958"
//               inkscape:window-height="1008"
//               inkscape:window-x="-7"
//               inkscape:window-y="0"
//               inkscape:window-maximized="0"
//               inkscape:current-layer="layer1" />
//            <defs
//               id="defs1888">
//              <linearGradient
//                 id="logo-gradient"
//                 x1="64"
//                 y1="0"
//                 x2="64"
//                 y2="128"
//                 gradientUnits="userSpaceOnUse"
//                 gradientTransform="translate(118.34251,1.5329343)">
//                <stop
//                   offset="20%"
//                   stop-color="#9990CF"
//                   id="stop4887" />
//                <stop
//                   offset="100%"
//                   stop-color="#38C7C7"
//                   id="stop4889" />
//              </linearGradient>
//              <clipPath
//                 clipPathUnits="userSpaceOnUse"
//                 id="clipPath1856">
//                <g
//                   id="g1864"
//                   transform="translate(0,10)"
//                   style="fill:#ffffff">
//                  <rect
//                     style="fill:#ffffff;stroke-width:0.261037"
//                     id="rect1858"
//                     width="110"
//                     height="18"
//                     y="15"
//                     rx="9"
//                     x="9" />
//                  <rect
//                     style="fill:#ffffff;stroke-width:0.261037"
//                     id="rect1860"
//                     width="110"
//                     height="18"
//                     y="45"
//                     rx="9"
//                     x="9" />
//                  <rect
//                     style="fill:#ffffff;stroke-width:0.261037"
//                     id="rect1862"
//                     width="110"
//                     height="18"
//                     y="75"
//                     rx="9"
//                     x="9" />
//                </g>
//              </clipPath>
//              <linearGradient
//                 inkscape:collect="always"
//                 xlink:href="#logo-gradient"
//                 id="linearGradient982"
//                 x1="6.7449017"
//                 y1="-156.05269"
//                 x2="134.74554"
//                 y2="-28.052696"
//                 gradientUnits="userSpaceOnUse"
//                 gradientTransform="translate(-6.7449101,156.35928)" />
//              <clipPath
//                 clipPathUnits="userSpaceOnUse"
//                 id="clipPath1856-1">
//                <g
//                   id="g1864-3"
//                   transform="translate(0,10)"
//                   style="fill:#ffffff">
//                  <rect
//                     style="fill:#ffffff;stroke-width:0.261037"
//                     id="rect1858-1"
//                     width="110"
//                     height="18"
//                     y="15"
//                     rx="9"
//                     x="9" />
//                  <rect
//                     style="fill:#ffffff;stroke-width:0.261037"
//                     id="rect1860-5"
//                     width="110"
//                     height="18"
//                     y="45"
//                     rx="9"
//                     x="9" />
//                  <rect
//                     style="fill:#ffffff;stroke-width:0.261037"
//                     id="rect1862-9"
//                     width="110"
//                     height="18"
//                     y="75"
//                     rx="9"
//                     x="9" />
//                </g>
//              </clipPath>
//            </defs>
//            <g
//               inkscape:label="Layer 1"
//               inkscape:groupmode="layer"
//               id="layer1">
//              <path
//                 style="fill:url(#linearGradient982);fill-opacity:1;stroke-width:0.704"
//                 id="rect63"
//                 width="128"
//                 height="128"
//                 x="0"
//                 y="0"
//                 sodipodi:type="rect"
//                 clip-path="url(#clipPath1856-1)"
//                 d="M 0,0 H 128 V 128 H 0 Z"
//                  />
//            </g>
//          </svg>
//             `}
//     />
//   );
// }

// export default function HamburgerIcon(props) {
//   let color = "#000";
//   return (
//     <Svg height="50" width="50" viewBox="0 0 256 256">
//       <Defs>
//         <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
//           <Stop offset="0" stopColor={Color.purple} stopOpacity="1" />
//           <Stop offset="1" stopColor={Color.blue} stopOpacity="1" />
//         </LinearGradient>
//         <ClipPath clipPathUnits="userSpaceOnUse" id="clipPath1856-1">
//           <G transform="translate(0,10)" style="fill:#ffffff">
//             <Rect width="110" height="18" y="15" rx="9" x="9" fill="#111" />
//             <Rect width="110" height="18" y="45" rx="9" x="9" fill="#111" />
//             <Rect width="110" height="18" y="75" rx="9" x="9" fill="#111" />
//           </G>
//         </ClipPath>
//         <Mask
//           id="Mask"
//           maskUnits="userSpaceOnUse"
//           x="0"
//           y="0"
//           width="128"
//           height="128"
//         >
//           <Rect x="0" y="0" width="800" height="300" fill="url(#Gradient)" />
//         </Mask>

//         <Text y="100" x="-50" id="Text" fontSize="100" textAnchor="middle">
//           Masked text
//         </Text>
//       </Defs>
//       <Ellipse y="0" x="0" cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" />
//       <G
//         id="layer1"
//         mask="url(#clipPath1856-1)"
//         clip-path="url(#clipPath1856-1)"
//       >
//         <Path
//           style="fill:url(#linearGradient982);fill-opacity:1;stroke-width:0.704"
//           fill="url(#grad)"
//           fillOpacity="1"
//           id="rect63"
//           width="128"
//           height="128"
//           x="0"
//           y="0"
//           d="M 0,0 H 128 V 128 H 0 Z"
//         />
//       </G>
//       {/* <Use href="url(#Text)" fill="blue" mask="url(#Mask)" /> */}
//     </Svg>
//   );
// }

export default function HamburgerIcon(props) {
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
          <G scale="0.55" x="30" y="30">
            <G transform="translate(0,10)" style="fill:#ffffff">
              <Rect width="110" height="18" y="15" rx="9" x="9" fill="#111" />
              <Rect width="110" height="18" y="45" rx="9" x="9" fill="#111" />
              <Rect width="110" height="18" y="75" rx="9" x="9" fill="#111" />
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
