var path = require('path');
module.exports = {
  entry: path.join(__dirname, 'client', 'app.es6'),
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.es6?$/, 
        exclude: /node_modules/,
        loader: 'babel-loader', 
        query: { presets: ['es2015'] }
      }
      
    ]
  }
};
