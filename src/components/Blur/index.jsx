import React from "react";
import blurBg from "assets/blur.png";

import "./style.css";

export default function Blur() {
  return (
    <div className="blur-bg">
      <img src={blurBg} className="blur-bg" alt="" />
    </div>
  );
}
