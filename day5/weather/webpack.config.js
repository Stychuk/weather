const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './main.js',
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[local]'
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
       alias: {
           vue: 'vue/dist/vue.esm-bundler'
       }
  },
 devServer: {
   static: path.join(__dirname, 'src'),
   compress: true,
   port: 5173
 },
 plugins: [
   new webpack.DefinePlugin({
     __VUE_OPTIONS_API__: true,
     __VUE_PROD_DEVTOOLS__: false
   }),
   new VueLoaderPlugin(),
 ],
};
