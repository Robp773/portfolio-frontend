import React from "react"
export function onRenderBody({ setHeadComponents }) {
  setHeadComponents([
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
    />,
  ])
}
