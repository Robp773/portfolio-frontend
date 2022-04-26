import { Alignment, Button, Navbar } from "@blueprintjs/core"
import React from "react"
import { Link } from "gatsby"
import { Colors } from "@blueprintjs/core"
import Media from "react-media"

const contentWrapper = {
  padding: "10px",
}

const Layout = ({ children, path }) => {
  return (
    <div
      className="bp4-dark"
      style={{ minHeight: "100vh", background: Colors.DARK_GRAY3 }}
    >
      <Media queries={{ small: { minWidth: 599 } }}>
        {matches => (
          <>
            <Navbar>
              <Navbar.Group align={Alignment.LEFT}>
                {matches.small && (
                  <>
                    <Navbar.Heading>Portfolio</Navbar.Heading>
                    <Navbar.Divider />
                  </>
                )}
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
              </Navbar.Group>
            </Navbar>
            <div style={contentWrapper}> {children}</div>
          </>
        )}
      </Media>
    </div>
  )
}
export default Layout
