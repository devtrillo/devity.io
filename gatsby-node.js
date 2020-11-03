async function createBlogPages(graphql, reporter, createPage) {
  const blogPostTemplate = require.resolve('./src/templates/post.jsx');
  const blogPosts = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { published: { eq: true } }
        }
        limit: 2000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  if (blogPosts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  blogPosts.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
      },
    });
  });
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  await createBlogPages(graphql, reporter, createPage);
};
