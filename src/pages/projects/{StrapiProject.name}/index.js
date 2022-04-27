import { Button, Divider, Tag, Overlay, Classes, Card } from "@blueprintjs/core"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React, { useState } from "react"
import Media from "react-media"
import Layout from "../../../components/layout"

const mobileLightBoxStyles = {
  minWidth: "80vw",
  maxHeight: "90vh",
}

const lightboxStyles = {
  maxWidth: "85vw",
  maxHeight: "90vh",
}

const ActivityPage = data => {
  const { strapiProject } = data.data

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeImage, setActiveImage] = useState(null)

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
          <div className="bp4-ui-text">
            <Overlay
              isOpen={isModalOpen}
              canEscapeKeyClose
              onClose={() => {
                setIsModalOpen(false)
                setActiveImage(null)
              }}
            >
              <Card
                className="bp4-dark"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <GatsbyImage
                  objectFit="contain"
                  style={matches.small ? mobileLightBoxStyles : lightboxStyles}
                  image={activeImage}
                />
              </Card>
            </Overlay>
            <div style={{ margin: "auto", maxWidth: "85ch" }}>
              <div
                style={{
                  display: "grid",
                  gridAutoFlow: "column",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "3px",
                }}
              >
                {strapiProject.screenshots.map((screenshot, index) => {
                  return (
                    <span
                      onClick={() => {
                        setActiveImage(
                          screenshot.localFile.childImageSharp.gatsbyImageData
                        )
                        setIsModalOpen(true)
                      }}
                    >
                      <GatsbyImage
                        key={index}
                        style={{
                          cursor: "pointer",
                          height: `${matches.small ? "150px" : "200px"}`,
                        }}
                        image={
                          screenshot.localFile.childImageSharp.gatsbyImageData
                        }
                      />
                    </span>
                  )
                })}
              </div>

              <h3 style={{ margin: "10px 0" }} className="bp4-heading">
                {strapiProject.name}
              </h3>
              <div className="bp4-text-large">
                Repositories:
                {strapiProject.repositories.map((repo, index) => {
                  return (
                    <a
                      key={index}
                      style={{ marginLeft: "5px" }}
                      href={repo.url}
                    >
                      {repo.name}
                    </a>
                  )
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "3px",
                  margin: "10px 0",
                }}
              >
                {strapiProject.tech.map((tech, index) => {
                  return (
                    <Tag style={{ textAlign: "center" }} key={index}>
                      {tech.name}
                    </Tag>
                  )
                })}
              </div>
              <div>
                <a target="#" href={strapiProject.demo_url}>
                  <Button text="Demo" intent="primary" />
                </a>
              </div>
              <div
                style={{ marginTop: "20px" }}
                dangerouslySetInnerHTML={{ __html: strapiProject.content }}
              />
            </div>
          </div>
        )}
      </Media>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String!) {
    strapiProject(id: { eq: $id }) {
      name
      screenshots {
        localFile {
          childImageSharp {
            gatsbyImageData(transformOptions: { cropFocus: CENTER })
          }
        }
      }
      content
      repositories {
        name
        url
      }
      demo_url
      id
      main_image {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 700, height: 250)
          }
        }
      }
      tech {
        name
      }
      strapiId
    }
  }
`
export default ActivityPage
