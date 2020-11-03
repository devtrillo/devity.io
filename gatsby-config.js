const path = require('path');
console.warn(__dirname);
module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-webpack-size',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-classes`,
            options: {
              classMap: {
                'heading[depth=1]': 'title',
                'heading[depth=2]': 'subtitle',
                a: 'link',
              },
            },
          },
          {
            resolve: 'gatsby-remark-table-of-contents',
            options: {
              exclude: 'Table of Contents',
              tight: false,
              fromHeading: 1,
              toHeading: 6,
              className: 'table-of-contents',
            },
          },
          'gatsby-remark-autolink-headers',
        ],
      },
    },
  ],
};
