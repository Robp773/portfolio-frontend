import React, { Fragment, useEffect, useState } from "react"
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
  Spinner,
  SpinnerSize,
  Tag,
} from "@blueprintjs/core"
import Media from "react-media"
const blogGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  gap: "5px",
}
const mobileBlogGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "5px",
}
const commitsGrid = {
  display: "grid",
  gridTemplateColumns: "30% 70%",
}
const mobileCommitsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
}
const tableStyles = {
  maxHeight: "350px",
  overflowY: "scroll",
  display: "inline-block",
}

ChartJS.register(ArcElement, Tooltip, Legend)

const ActivityPage = data => {
  const [commits, setCommits] = useState([])
  const [chartData, setChartData] = useState({ labels: [], data: {} })
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
      data.forEach(ghEvent => {
        const repoName = ghEvent.repo.name
        if (!Object.keys(count).includes(repoName)) {
          count[repoName] = 1
        } else {
          count[repoName]++
        }
      })

      setChartData({ labels: Object.keys(count), data: Object.values(count) })
      setCommits(data)
      setTimeout(() => {
        setIsLoading(false)
      }, 250)
    })()
  }, [])
  return (
    <Layout path={data.location.pathname}>
      {isLoading ? (
        <div style={{ padding: "50px" }}>
          <Spinner size={SpinnerSize.LARGE} />
        </div>
      ) : (
        <Media
          queries={{
            xsmall: "(max-width: 399px)",
            small: "(max-width: 599px)",
            medium: "(min-width: 600px) and (max-width: 1199px)",
            large: "(min-width: 1200px)",
          }}
        >
          {matches => (
            <>
              <h3 className="bp4-heading" style={commitsGrid}>
                Recent Commits
              </h3>

              <div style={matches.small ? mobileCommitsGrid : commitsGrid}>
                <div
                  style={{
                    maxHeight: "400px",
                    minHeight: "300px"
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
                <div>
                  <table
                    style={tableStyles}
                    className="bp4-html-table bp4-html-table-striped bp4-html-table-condensed"
                  >
                    <thead>
                      <tr>
                        <th>Repository</th>
                        <th>Message</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commits.map((data, index) => {
                        return data.payload.commits &&
                          data.payload.commits[0] ? (
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
                        ) : null
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <Divider />
              <h3 className="bp4-heading">Blog Posts</h3>
              <div style={matches.small ? mobileBlogGrid : blogGrid}>
                {posts.map((post, index) => {
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
                        <img
                          alt={post.title}
                          src={post.social_image}
                          style={{ maxWidth: "100%" }}
                        />
                        <h5
                          style={{ marginTop: "10px" }}
                          className="bp4-heading"
                        >
                          {post.title}
                        </h5>
                        <div
                          style={{
                            display: "grid",
                            gridAutoFlow: "column",
                            gap: "3px",
                          }}
                        >
                          {post.tag_list.map((tag, index) => {
                            return (
                              <Tag style={{ textAlign: "center" }} key={index}>
                                {tag}
                              </Tag>
                            )
                          })}
                        </div>
                        <p
                          style={{ marginTop: "10px" }}
                          className="bp4-ui-text"
                        >
                          {post.description}
                        </p>
                      </div>
                      <a style={{ color: Colors.WHITE }} href={post.url}>
                        <Button intent="primary">Read</Button>
                      </a>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
        </Media>
      )}
    </Layout>
  )
}

export default ActivityPage
