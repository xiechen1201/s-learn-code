const HtmlWebapackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './index.js'
  },
  plugins: [
    new HtmlWebapackPlugin({
      template: './index.html'
    })
  ]
};
