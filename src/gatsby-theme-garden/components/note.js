import React from "react";
import { MDXProvider } from "@mdx-js/react";
import * as components from "gatsby-theme-garden/src/components/mdx-components";
import MDXRenderer from "gatsby-theme-garden/src/components/mdx-components/mdx-renderer";
import ReferencesBlock from "gatsby-theme-garden/src/components/references-block";
import { LinkToStacked } from "react-stacked-pages-hook";

const Note = (data) => {
  const AnchorTag = (props) => (
    <components.a {...props} references={data.outboundReferences} />
  );

  var is_blog = false;

  if (data && data.inboundReferences && data.inboundReferences.length > 0 && data.inboundReferences[0].title == "Blog") {
    is_blog = true;
    console.log(data.inboundReferences[0].title)
  }


  return (
    <React.Fragment>
      {data.partOf ? (
        <div>
          Part of{" "}
          <LinkToStacked to={data.partOf.slug}>
            {data.partOf.title}
          </LinkToStacked>
        </div>
      ) : null}
      <MDXProvider components={{ ...components, a: AnchorTag }}>
        {
          is_blog?
          <img class="hero_image" alt="hero_image" src={`${process.env.CURRENT_DOMAIN}/Blog/${data.title}/seo.png`}></img>:
          null
        }
        <MDXRenderer>{data.mdx}</MDXRenderer>
      </MDXProvider>
      <ReferencesBlock references={data.inboundReferences} />
    </React.Fragment>
  );
};

export default Note;
