import * as React from "react";
import type { SVGProps } from "react";
const SvgTank = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 60.325 60.325"
    {...props}
  >
    <path
      style={{
        fill: "currentcolor",
      }}
      d="M5.44 34.59V10.521c0-3.859 8.044-8.916 24.723-8.916 16.678 0 24.723 5.057 24.723 8.916V34.59c0 5.821-19.817 24.133-24.723 24.133-4.906 0-24.723-18.312-24.723-24.133"
    />
  </svg>
);
export default SvgTank;
