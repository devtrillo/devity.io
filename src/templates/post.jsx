import React from 'react';
import { graphql } from 'gatsby';

export default function Template({ data, ...rest }) {
  console.warn({ ...rest, data });
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html, tableOfContents } = markdownRemark;
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <div className="table-of-contents">
        <div dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
      tableOfContents(absolute: true)
      timeToRead
      wordCount {
        words
        paragraphs
        sentences
      }
    }
  }
`;
