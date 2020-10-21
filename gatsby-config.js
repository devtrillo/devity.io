const path = require('path');

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-webpack-size',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        store: path.join(__dirname, 'src/store'),
        components: path.join(__dirname, 'src/components'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
  ],
};
