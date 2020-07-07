const path = require('path');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin');// eslint-disable-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function buildEnvironment(env = {}) {
  return {
    mode: env.production ? 'production' : 'development',

    devtool: 'source-map',

    entry: {
      index: './src/index.jsx',
      components: './src/components/index.js',
      plugins: './src/plugins/index.js',
      services: './src/services/index.js',
    },

    output: {
      filename: '[name].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
      port: 3000,
      contentBase: path.resolve(__dirname, 'dist'),
      hot: true,
      publicPath: '/',
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8090/api',
          pathRewrite: { '^/api': '' },
        },
      },
    },

    optimization: env.production ? {
      splitChunks: {
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `js/${packageName.replace('@', '')}`;
            },
          },
          test: {
            test: /[\\/]components[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]components[\\/](.*?)([\\/]|$)/)[1];
              return `components/${packageName.replace('@', '')}`;
            },
          },
        },
      },
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    } : {},

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.css$/,
          use: [
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]',
                },
                // modules: true,
                // localIdentName: '[local]',
                // camelCase: true,
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
              },
            },
          ],
        },
        {
          test: /\.(png|jp(e*)g|pdf|gif|woff|woff2|ttf|eot|svg|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'static/',
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
        ENV: env.production ? JSON.stringify('PROD') : JSON.stringify('DEV'),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico',
        hash: true,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    resolve: { extensions: ['.js', '.jsx'] },
  };
};
