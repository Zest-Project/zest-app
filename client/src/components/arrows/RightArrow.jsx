import React from "react";
import "../../scss/styles";

const RightArrow = () => {

  return (
    <div
      className="right container"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="72"
        viewBox="0 0 64 72"
      >
        <g
          id="Group_244"
          data-name="Group 244"
          transform="translate(-1874 -438)"
        >
          <g
            id="Ellipse_4"
            data-name="Ellipse 4"
            transform="translate(1874 444)"
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
            transform="translate(1890 497)"
            fill="#d2e0ce"
            fontSize="60"
            fontFamily="Lato-Bold, Lato"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              &gt;
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default RightArrow;
