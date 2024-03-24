import { CSSProperties, useRef, useState } from "react";
import LogoAnimated from "../LogoAnimated";
import "./logo-animated.css";

type Props = {
  style?: CSSProperties;
};

/**
 * !!! Alert this code is legacy do not use
 */
export default function LogoAnimatedLight({ style }: Props) {

  return (
    <LogoAnimated />
  );
}
