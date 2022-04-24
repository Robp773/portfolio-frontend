import { graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import moment from "moment"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

import {
  Button,
  Card,
  Colors,
  Divider,
  Elevation,
  Tag,
} from "@blueprintjs/core"
const blogGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "5px",
}

const commitsGrid = {
  display: "grid",
  gridTemplateColumns: "60% 40%",
}

const tableStyles = {
  maxHeight: "400px",
  overflowY: "scroll",
  display: "inline-block",
}

ChartJS.register(ArcElement, Tooltip, Legend)

const ActivityPage = data => {
  const [commits, setCommits] = useState([])
  const [chartData, setChartData] = useState({ labels: [], data: {} })
  const [posts, setPosts] = useState([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        "https://api.github.com/users/robp773/events/public?per_page=100"
      )
      const devToData = await fetch(
        "https://dev.to/api/articles?username=robp773"
      )

      const data = await response.json()
      const posts = await devToData.json()
      setPosts(posts)

      const count = {}
      data.map(ghEvent => {
        const repoName = ghEvent.repo.name
        if (!Object.keys(count).includes(repoName)) {
          count[repoName] = 1
        } else {
          count[repoName]++
        }
      })

      setChartData({ labels: Object.keys(count), data: Object.values(count) })
      setCommits(data)
    })()
  }, [])
  return (
    <Layout  path={data.location.pathname}>
      <h3 style={commitsGrid}>Recent Commits</h3>
      <div style={commitsGrid}>
        <div>
          <table
            style={tableStyles}
            className="bp4-html-table bp4-html-table-striped bp4-html-table-condensed"
          >
            <thead>
              <tr>
                <th>Repo</th>
                <th>Message</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {commits.map((data, index) => {
                if (data.payload.commits && data.payload.commits[0]) {
                  return (
                    <tr key={index}>
                      <td>{data.repo.name}</td>
                      <td>
                        {data.payload.commits.map((commit, index) => {
                          return (
                            <div key={index}>
                              <a
                                href={`https://github.com/${data.repo.name}/commit/${commit.sha}`}
                              >
                                {commit.message}
                              </a>
                            </div>
                          )
                        })}
                      </td>
                      <td>{moment(data.created_at).fromNow()}</td>
                    </tr>
                  )
                } else {
                  return null
                }
              })}
            </tbody>
          </table>
        </div>
        <div
          style={{
            maxHeight: "400px",
          }}
        >
          <Pie
            options={{
              maintainAspectRatio: false,
              color: Colors.WHITE,
            }}
            data={{
              labels: chartData.labels,
              datasets: [
                {
                  data: chartData.data,
                  backgroundColor: [
                    Colors.CERULEAN1,
                    Colors.CERULEAN2,
                    Colors.CERULEAN3,
                    Colors.CERULEAN4,
                    Colors.CERULEAN5,
                  ],

                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>

      <Divider />
      <h3 classNambloeG="bading">Blog Posts</h3>
      <div style={blogGrid}>
        {posts.map((post, index) => {
          return (
            <Card key={index} elevation={Elevation.TWO}>
              <img src={post.social_image} style={{maxWidth: "100%"}}/>
              <h5 className="bp4-heading">{post.title} </h5>
              <div>
                {post.tag_list.map((tag, index) => {
                  return (
                    <Tag
                      style={{ marginRight: "5px" }}
                      key={index}
                    >
                      {tag}
                    </Tag>
                  )
                })}
              </div>
              <p className="bp4-ui-text" style={{margin: "10px auto"}}>{post.description}</p>
              <Button intent="primary">
                <a style={{color: Colors.WHITE}}href={post.url}>Read</a>
              </Button>
            </Card>
          )
        })}
      </div>
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
