const HtmlWebPackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const deps = require('./package.json').dependencies

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'react_mfe_product',
      filename: 'remoteEntry.js',
      remotes: {
        react_mfe_checkout:
          'react_mfe_checkout@https://checkout.react-mfe.zydhan.com/remoteEntry.js',
        react_mfe_inspire:
          'react_mfe_inspire@https://inspire.react-mfe.zydhan.com/remoteEntry.js',
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './public/index.html',
    }),
  ],
}
