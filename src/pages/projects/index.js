import { graphql } from "gatsby"
import * as React from "react"
import Layout from "../../components/layout"

const ActivityPage = data => {
  console.log(data)
  return <Layout path={data.location.pathname}>projects page</Layout>
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
