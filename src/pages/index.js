import * as React from "react"
import Layout from "../components/layout"
import TechDisplay from "../components/techDisplay"
import Media from 'react-media';


const tagContainerStyle = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
}

const dividerStyle = { margin: "auto 5px" }

const introTextWrapper = {
  margin: "20px 0",
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

     
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a target="#" href="mailto:robpeterman573@gmail.com">
            Email
          </a>
          <div style={dividerStyle}>|</div>
          <a target="#" href="https://www.linkedin.com/in/robertpeterman92/">
            LinkedIn
          </a>
          <div style={dividerStyle}>|</div>
          <a target="#" href="https://angel.co/u/robert-peterman">
            AngelList
          </a>
          <div style={dividerStyle}>|</div>
          <a target="#" href="https://github.com/Robp773">
            GitHub
          </a>
        </div>
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

export default IndexPage
