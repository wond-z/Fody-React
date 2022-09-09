// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   entry: './src/index.tsx', // 必须为tsx
   output: {
      path: path.join(__dirname, '/dist'),
      filename: 'bundle.js'
   },
   devServer: {
      port: 8080,
      static: {
         directory: path.join(__dirname, "/")
      },
   },
   module: {
      rules: [
         {
            test: /\.js|jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader' // Babel7中提供的babel-loader就可以完美进行编译ts
        }
      ]
   },
   resolve: {
       extensions: [ '.tsx', '.ts', '.js' ]
   },
   plugins:[
       new HtmlWebpackPlugin({
            template: path.join(__dirname,'/src/index.html')
       })
   ]
}
