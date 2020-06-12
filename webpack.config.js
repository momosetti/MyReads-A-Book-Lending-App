const webpack = require('webpack');
const path = require('path');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  devServer: {
    contentBase: './public',
    port:3000
    // onListening: function(server) {
    //   const port = server.listeningApp.address().port;
    //   console.log(`\nServer Running on: http://localhost:${port}`);
    // },
    // open:true
  },
  plugins: [new ErrorOverlayPlugin()],
  devtool: 'cheap-module-source-map', // 'eval' is not supported by error-overlay-webpack-plugin
};

module.exports = config;