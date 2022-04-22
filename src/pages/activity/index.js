import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import moment from "moment"

const tableStyles = {
  width: "50%",
}

const ActivityPage = data => {
  const [commits, setCommits] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        "https://api.github.com/users/robp773/events/public"
      )
      const data = await response.json()
      setCommits(data)
    })()
  }, [])
  return (
    <Layout path={data.location.pathname}>
      <table
        style={tableStyles}
        class="bp4-html-table  bp4-html-table-striped bp4-html-table-condensed"
      >
        <thead>
          <tr>
            <th>Repo</th>
            <th>Message</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {commits.map(data => {
            if (data.payload.commits && data.payload.commits[0])
              return (
                <tr>
                  <td>{data.repo.name}</td>
                  <td>
                    {data.payload.commits.map(commit => {
                      return commit.message
                    })}
                  </td>
                  <td>{moment(data.created_at).fromNow()}</td>
                </tr>
              )
          })}
        </tbody>
      </table>
    </Layout>
  )
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
