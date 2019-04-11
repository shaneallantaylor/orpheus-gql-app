const path = require('path');
const CLIENT_DIR = path.resolve(__dirname, './client'); // created to seperate web app css from monaco css

module.exports = {
  mode: 'development',
  devtool: "inline-source-map",
  entry: ['babel-polyfill', path.resolve('./client', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,

        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.scss$/,
        include: CLIENT_DIR,
        exclude: /(node_modules|bower_components)/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  devServer: {
    publicPath: '/build',
    contentBase: './',
    port: 8080,
    proxy: {
      '/orpheus': {
        target: "http://localhost:3500",
        pathRewrite: { '^/orpheus': '' }
      }
    }
  }
};
