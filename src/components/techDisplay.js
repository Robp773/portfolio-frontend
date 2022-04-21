import React from "react"

const TechDisplay = ({ name, icon }) => {
  return (
    <div style={{margin: "10px"}}>
      <i style={{ fontSize: "40px" }} class={icon}></i>
      <h6 className="bp4-heading">{name}</h6>
    </div>
  )
}

export default TechDisplay
