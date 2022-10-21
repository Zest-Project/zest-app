import React from "react";
import "../../scss/styles";

const LeftArrow = () => {
  return (
    <div
      className="left container"
    >
      <svg
        id="Group_291"
        data-name="Group 291"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="72"
        viewBox="0 0 64 72"
      >
        <g
          id="Ellipse_4"
          data-name="Ellipse 4"
          transform="translate(0 6)"
          fill="#213634"
          stroke="#707070"
          strokeWidth="1"
        >
          <circle cx="32" cy="32" r="32" stroke="none" />
          <circle cx="32" cy="32" r="31.5" fill="none" />
        </g>
        <text
          id="_"
          data-name="&gt;"
          transform="matrix(-1, 0, 0, 1, 48, 59)"
          fill="#d2e0ce"
          fontSize="60"
          fontFamily="Lato-Bold, Lato"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            &gt;
          </tspan>
        </text>
      </svg>
    </div>
  );
};

export default LeftArrow;
