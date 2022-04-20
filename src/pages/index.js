import * as React from "react"
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

// import Layout from "../components/layout"
// import Seo from "../components/seo"
import { graphql, Link } from "gatsby"

const IndexPage = data => {
  console.log(data)
  return <div>index page</div>
}

export const indexPageQuery = graphql`
  {
    allStrapiProject {
      edges {
        node {
          title
          description
          gallery {
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
