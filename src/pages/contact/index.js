import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../../components/layout"

const ActivityPage = data => {
  return <Layout path={data.location.pathname}>contact page</Layout>
}

export const activityPageQuery = graphql`
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
export default ActivityPage
