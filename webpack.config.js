const path = require('path');
// const bootstrap = require('bootstrap')
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         title: 'Suru'
    //     })
    // ],
    // output:{
    //     filename: 'main.js',
    //     path: path.resolve(__dirname, 'dist')
    // },
    module: {
        rules:[
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.(scss)$/,
            use: [{
              // inject CSS to page
              loader: 'style-loader'
            }, {
              // translates CSS into CommonJS modules
              loader: 'css-loader'
            }, {
              // Run postcss actions
              loader: 'postcss-loader',
              options: {
                // `postcssOptions` is needed for postcss 8.x;
                // if you use postcss 7.x skip the key
                postcssOptions: {
                  // postcss plugins, can be exported to postcss.config.js
                  plugins: function () {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              }
            }, {
              // compiles Sass to CSS
              loader: 'sass-loader'
            }]
          },
          {
            test: /\.(svg|eot|woff|woff2|ttf)$/,
            loader: 'file-loader'
          }, 
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'html-loader'
          },
        ]
    }
}