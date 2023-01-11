import { useStaticQuery, graphql } from "gatsby"

export const useSharingData = () => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    sort: { order: ASC, fields: [frontmatter___date] },
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
                        url
                        excerpt
                        tags
                    }
                    }
                }
                }
            }
    `
    )
    // console.log(allMarkdownRemark);
    return allMarkdownRemark.edges
}