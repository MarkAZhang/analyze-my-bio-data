var path = require('path');

var LIB_DIR = path.resolve(__dirname, 'frontend');

var config = {
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      '~': LIB_DIR
    }
  },
  module : {
    rules: [
      {
        test : /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: true
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:5]!postcss-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: [/node_modules/],
      },
      {
        test: /\.(png|svg|eot|woff2?|ttf|jpg|gif)/,
        loader: 'url-loader?limit=5000&publicPath=static/',
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true
        }
      }
    ]
  }
}

module.exports = config
