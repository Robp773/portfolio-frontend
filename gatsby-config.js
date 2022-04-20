require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        accessToken: process.env.STRAPI_TOKEN || "f67c0aba28cde099e7822961855074a7086284a3106f709236c746b7e702d0e7416d61e779078723c5473233108485af3ca50dd55b38950e3aece19f8367867deed4ee533f1161ca3437c4e0ca30c54076b0c71487e286c580aeb91d50853b8a2047fb61795f3fca3f793ed8b3f375bd7d18eaa23a88d2d5cab3d2c1ac21a580",
        collectionTypes: ["project"],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
  ],
}
