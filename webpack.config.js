const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const WebpackShellPlugin = require('webpack-shell-plugin')
const Visualizer = require('webpack-visualizer-plugin')

const version = gitRevisionPlugin.version().replace('v', '')

module.exports = [
  {
    entry: './src/loader.js',
    output: {
      path: path.resolve(__dirname, './dist', 'loader'),
      filename: 'loader.js'
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: 'svelte-loader'
        }
      ]
    },
    plugins: [
      new SWPrecacheWebpackPlugin(require('./loader-sw-precache-config.js')),
      new CopyWebpackPlugin([
        {from: './loader.html', to: 'index.html'},
      ]),
    ]
  },
  {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist', version),
      publicPath: `/${version}/`,
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ],
        }, {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {}
            // other vue-loader options go here
          }
        },
        // {
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   exclude: /node_modules/
        // },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __VERSION_COMMIT_HASH_SHORT: JSON.stringify(version)
      }),
      new CopyWebpackPlugin([
        {from: './app.html', to: './index.html'},
      ]),
      new SWPrecacheWebpackPlugin(require('./app-sw-precache-config.js')),
      gitRevisionPlugin, // Write VERSION and COMMITHASH files
      // new Visualizer(),
      new WebpackShellPlugin({onBuildEnd:[`ln -sfn ${version} ./dist/latest`]})
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }
]

if (process.env.NODE_ENV === 'production') {
  for(const md of module.exports) {
    md.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    md.plugins = (md.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 6
        }
      }),
    ])
  }
}
