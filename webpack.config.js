var path = require('path')

module.exports = {
  entry: './server.ts',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'server')
  },
  module: {
    exprContextCritical: false,
    exprContextRecursive: true,
    rules: [{
      test: /\.ts$/,
      loaders: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/
    },
    {
      test: /.(gql|graphql)$/, 
      loader: 'graphql-tag/loader'
    }]
  },
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.gql',
      '.graphql']
  }
}