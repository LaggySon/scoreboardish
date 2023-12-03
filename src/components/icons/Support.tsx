import * as React from "react";
import type { SVGProps } from "react";
const SvgSupport = (props: SVGProps<SVGSVGElement>) => (
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
      d="M40.777 54.38c0 1.896-1.619 4.347-3.654 4.347H23.201c-2.034 0-3.653-2.45-3.653-4.347V40.783H5.95c-1.896 0-4.347-1.619-4.347-3.654V23.207c0-2.034 2.45-3.653 4.347-3.653h13.597V5.957c0-1.896 1.619-4.347 3.653-4.347h13.922c2.035 0 3.654 2.45 3.654 4.347v13.597h13.597c1.896 0 4.347 1.619 4.347 3.653V37.13c0 2.035-2.45 3.654-4.347 3.654H40.777z"
    />
  </svg>
);
export default SvgSupport;
