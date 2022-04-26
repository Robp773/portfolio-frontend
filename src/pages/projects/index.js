import { Button, Card, Colors, Elevation, Tag } from "@blueprintjs/core"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as React from "react"
import Layout from "../../components/layout"
import slugify from "@sindresorhus/slugify"
import { CSSTransitionGroup } from "react-transition-group"
import Media from "react-media"

const projectGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "5px",
}

const mobileProjectGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "5px",
}

const tagsGrid = {
  display: "grid",
  gridAutoFlow: "column",
  gap: "3px",
}

const mobileTagsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "3px",
}
const ActivityPage = data => {
  const projects = data.data.allStrapiProject.edges

  console.log(projects)

  return (
    <Layout path={data.location.pathname}>
      <Media
        queries={{
          xsmall: "(max-width: 399px)",
          small: "(max-width: 599px)",
          medium: "(min-width: 600px) and (max-width: 1199px)",
          large: "(min-width: 1200px)",
        }}
      >
        {matches => (
          <div style={matches.large ? projectGrid : mobileProjectGrid}>
            {projects.map(({ node }, index) => {
              return (
                <Card
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                  key={index}
                  elevation={Elevation.TWO}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                    }}
                  >
                    <GatsbyImage
                      image={
                        node.main_image.localFile.childImageSharp
                          .gatsbyImageData
                      }
                    />
                    <h5 style={{ marginTop: "10px" }} className="bp4-heading">
                      {node.name}
                    </h5>
                    <div style={matches.small ? mobileTagsGrid : tagsGrid}>
                      {node.tech.map((tech, index) => {
                        return (
                          <Tag style={{ textAlign: "center" }} key={index}>
                            {tech.name}
                          </Tag>
                        )
                      })}
                    </div>
                    <p style={{ marginTop: "10px" }} className="bp4-ui-text">
                      {node.description}
                    </p>
                  </div>
                  <a
                    style={{ color: Colors.WHITE }}
                    href={`/projects/${slugify(node.name)}`}
                  >
                    <Button intent="primary">Read</Button>
                  </a>
                </Card>
              )
            })}
          </div>
        )}
      </Media>
    </Layout>
  )
}

export const activityPageQuery = graphql`
  {
    allStrapiProject {
      edges {
        node {
          demo_url
          repositories {
            name
            url
          }
          tech {
            name
          }
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
                gatsbyImageData(width: 400, height: 300)
              }
            }
          }
        }
      }
    }
  }
`
export default ActivityPage
