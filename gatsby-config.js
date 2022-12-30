module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-garden`,
      options: {
        contentPath: `${__dirname}/content/garden`,
        rootNote: `/hello`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `BLOG`,
        path: `${__dirname}/content/garden/BLOG`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `SHARING`,
        path: `${__dirname}/content/garden/SHARING`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  // custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["RSS"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    excerpt
                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Everything from Better Next Week by Olivia Wang.",
          },
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  // custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["Blog"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    excerpt

                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/blog.xml",
            title: "Articles from Better Next Week by Olivia Wang.",
          },
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  // custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["Newsletter"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    excerpt

                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/newsletter.xml",
            title: "Better Next Week - Your weekly dose of productivity, coding, and self-improvement inspiration by Olivia Wang.",
          },
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  // custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { 
                    frontmatter: { tags: { in: ["Sharing"] }, published: { eq: true } } 
                  },
                  limit: 20
                ) {
                  nodes {
                    excerpt

                    fields { 
                      slug 
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/sharing.xml",
            title: "Interesting links from Better Next Week by Olivia Wang.",
          },
        ],
      },
    },
    
    
    
    
  ],

  siteMetadata: {
    title: 'Better Next Week by Olivia Wang',
    description: 'Your weekly dose of productivity, coding, and self-improvement inspiration',
    siteUrl: 'https://oliwang.github.io/',
    author: 'Olivia Wang',
    email: 'betternextweek.bnw@gmail.com'
  },

}
