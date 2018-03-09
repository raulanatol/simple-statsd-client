const path = require("path");

const PATHS = {
  entryPoint: path.resolve(__dirname, 'lib/index.ts'),
  bundles: path.resolve(__dirname, 'dist'),
};

const config = {
  mode: 'production',
  target: 'node',
  entry: {
    'index.min': [PATHS.entryPoint]
  },
  output: {
    path: PATHS.bundles,
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'simple-statsd-client',
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            exclude: /node_modules/,
            query: {
              declaration: false
            }
          }
        }],
      }
    ]
  }
};

module.exports = config;
