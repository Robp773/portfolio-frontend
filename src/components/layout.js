import { Alignment, Button, Navbar } from "@blueprintjs/core"
import React from "react"
import { Link } from "gatsby"

const contentWrapper = {
  padding: "10px",
}
const Layout = ({ children, path }) => {
  return (
    <div>
      <Navbar className="bp4-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Portfolio</Navbar.Heading>
          <Navbar.Divider />
          <Link to="/">
            <Button
              active={path === "/"}
              minimal
              large
              icon="user"
              text="Intro"
            />
          </Link>
          <Link to="/activity">
            <Button
              active={path === "/activity"}
              minimal
              large
              icon="book"
              text="Activity"
            />
          </Link>
          <Link to="/projects">
            <Button
              active={path === "/projects"}
              minimal
              large
              icon="projects"
              text="Projects"
            />
          </Link>
          <Link to="/contact">
            <Button
              active={path === "/contact"}
              minimal
              large
              icon="chat"
              text="Contact"
            />
          </Link>
        </Navbar.Group>
      </Navbar>
      <div style={contentWrapper}> {children}</div>
    </div>
  )
}
export default Layout
