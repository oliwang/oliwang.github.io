import "./src/styles/global.css"
import React from "react"
import { MDXProvider } from "@mdx-js/react";

import { useSharingData } from "hooks/get-all-sharing"


const SharingTable = () => {
    const edges = useSharingData()


    const table_rows = edges.map(edge => 
        <tr class="SharingTableRow">
            <td>
                <a href={edge.node.frontmatter.url} target="_blank" rel="noopener noreferrer">{edge.node.frontmatter.title}</a>
            </td>
            <td>
                <p>{edge.node.frontmatter.excerpt}</p>
            </td>
            <td>
                <p class="tags">{edge.node.frontmatter.tags.map(tag => <span>#{tag}</span>)}</p>
            </td>
        </tr>
    )
    return (
        <table class="SharingTable">
            <tr class="SharingTableHeaderRow">
                <th>Link</th>
                <th>Description</th>
                <th>Tags</th>
            </tr>
            {table_rows}
        </table>
    )

}

const components = {
    SharingTable, SharingTable, 
}

export const wrapRootElement = ({ element }) => {
    return (
      <MDXProvider components={components}>
        {element}
      </MDXProvider>
    );
  };