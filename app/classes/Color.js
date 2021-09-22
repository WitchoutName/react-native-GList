import { TextEncoder } from "text-encoding";

const profileBg = [
  "#713FBC",
  "#8abc3f",
  "#3f4bbc",
  "#b03fbc",
  "#bc3f8a",
  "#bc713f",
];
function getProfileBg(user) {
  const code = new TextEncoder().encode(user.username[0])[0];
  return profileBg[code % profileBg.length];
}

export default {
  primary: "#081826",
  secondary: "#0F2D40",
  heading: "#165873",
  text: "#1C788C",
  bg: "#4EB4BF",
  plusGeen: "rgb(42, 207, 97)",
  grayPlus: "rgba(42, 207, 97, 0.4)",
  checked: "#dedede",
  purple: "#9990CF",
  darkPurple: "#796DC6",
  blue: "#38C7C7",
  inputText: "#BBBBBB",
  blueText: "#598497",
  grayText: "#647881",
  link: "#000AFF",
  white: "#FFF",
  listBorderOut: "#C4C4C4",
  listBorderIn: "#E3E3E3",
  separator: "#ddd",
  getProfileBg,
};
