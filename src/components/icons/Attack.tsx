import * as React from "react";
import type { SVGProps } from "react";
const SvgAttack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 250 250"
    {...props}
  >
    <path
      d="M7 5h31l76 76-31 31L7 37V5Zm236 0v32L100 179l-31-30L212 5h31Zm-76 130 7 6.5 7 6.5-31 31-14-13 15.5-15.5ZM30 145h14a714.226 714.226 0 0 1 34.793 33.049A711.458 711.458 0 0 1 104 205v14H89l-59-60v-14Zm190 0v15c-20 19.665-38 38.335-58 58h-15v-14c20-19.665 39-39.335 59-59h14ZM41 193l14 14-37 38-14-14Zm167 0 38 38-13 14-38-38Z"
      style={{
        fill: "#fff",
        fillRule: "evenodd",
      }}
    />
  </svg>
);
export default SvgAttack;
