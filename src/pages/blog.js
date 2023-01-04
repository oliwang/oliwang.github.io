import React from "react"
import { graphql } from "gatsby"

const BlogPage = ({
    data: {
      allMarkdownRemark: { edges },
    },
  }) => {
    const Posts = edges
      .map(edge => <p key={edge.node.id} post={edge.node} > {edge.node.frontmatter.title} </p>)
  
    return <div>{Posts}</div>
}
  
  export const query = graphql`
    query {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
            filter: { 
                frontmatter: { tags: { in: ["Sharing"] }, published: { eq: true } } 
            },
        
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 250)
              fields { 
                slug 
              }
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
              }
            }
          }
        }
    }
  `
  
  export const Head = () => <div title="My Blog Posts" />
  
  export default BlogPage