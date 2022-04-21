import * as React from "react"
import { graphql } from "gatsby"
import { Button, Tag } from "@blueprintjs/core"
import { Icon, IconSize } from "@blueprintjs/core"
import Layout from "../components/layout"
import TechDisplay from "../components/techDisplay"

const tagStyle = {
  margin: "auto 10px",
}
const tagContainerStyle = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
}
const introTextWrapper = {
  margin: "20px 0",
}
const iconStyle = {
  fontSize: "40px",
}

const IndexPage = data => {
  return (
    <Layout path={data.location.pathname}>
      <div style={introTextWrapper}>
        <h2 style={{ textAlign: "center" }} className="bp4-heading">
          Rob Peterman
        </h2>
        <h3 style={{ textAlign: "center" }} className="bp4-heading">
          Full Stack JavaScript Developer
        </h3>

      </div>

      <div>
        <div style={tagContainerStyle}>
          <TechDisplay name="JavaScript" icon="devicon-javascript-plain" />
          <TechDisplay name="HTML5" icon="devicon-html5-plain" />
          <TechDisplay name="CSS3" icon="devicon-css3-plain" />
        </div>
        <div style={tagContainerStyle}>
          <TechDisplay name="React" icon="devicon-react-original" />
          <TechDisplay name="MongoDB" icon="devicon-mongodb-plain" />
          <TechDisplay name="Node.js" icon="devicon-nodejs-plain" />
          <TechDisplay name="Express" icon="devicon-express-original" />
          <TechDisplay name="Angular" icon="devicon-angularjs-plain" />{" "}
          <TechDisplay name="SASS/SCSS" icon="devicon-sass-original" />
          <TechDisplay name="TypeScript" icon="devicon-typescript-plain" />
        </div>
      </div>
    </Layout>
  )
}

export const indexPageQuery = graphql`
  {
    allStrapiProject {
      edges {
        node {
          name
          description
          screenshots {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          main_image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
export default IndexPage
