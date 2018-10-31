const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const pkg = require('./../../package.json');
const libraryName= pkg.name;
const BASE_PATH = path.join(__dirname, '../..');
const ICON_PATH = path.join(__dirname, '../..', 'src/Icon/resources');

module.exports = {
  entry: path.resolve(BASE_PATH, 'src/index.tsx'),
  output: {
    path: path.resolve(BASE_PATH, 'dist'),
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    publicPath: '/',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        exclude: ICON_PATH,
        options: {
            limit: 100000
        }
      },
      {
        test: /\.svg$/i,
        include: ICON_PATH,
        loader: 'svg-sprite-loader',
        options: {
            symbolId: 'ui-icon-[name]'
        }
      }
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
  externals: {
    react: {
        commonjs: "react",
        commonjs2: "react",
        amd: "React",
        root: "React"
    },
    "react-dom": {
        commonjs: "react-dom",
        commonjs2: "react-dom",
        amd: "ReactDOM",
        root: "ReactDOM"
    },
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components'
    },
    'styled-theming': {
      commonjs: 'styled-theming',
      commonjs2: 'styled-theming',
      amd: 'styled-theming'
    },
  }
};